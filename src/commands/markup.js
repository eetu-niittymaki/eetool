import fs from 'fs/promises'
import path from 'path'
import puppeteer from 'puppeteer'
import pdfjs from 'pdfjs-dist/legacy/build/pdf.js'
import { unified } from 'unified'
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';
import { validateFilename } from '../validators/validateFilename.js'
import { validateFileLocation } from '../validators/validateFileLocation.js'
import createLogger from '../logger.js'
const logger = createLogger('command:markup')
const { getDocument } = pdfjs

const htmlToPDF = async (data, outfile) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(data, { waitUntil: 'networkidle0' })

    await page.pdf({
        path: outfile,
        format: 'A4',
        printBackground: true
    })

    await browser.close()
}

const getTextFromPDF = async (infile) => {
    const buffer = await fs.readFile(infile)
    const data = new Uint8Array(buffer)
    const pdf = await getDocument({
        data,
        disableWorker: true,
        isEvalSupported: false,
        useSystemFonts: true
    }).promise

    let markdown = ''

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()

        // Sort by vertical position (Y), then horizontal (X)
        const items = content.items.sort((a, b) => {
            const yDiff = b.transform[5] - a.transform[5]
            if (Math.abs(yDiff) > 3) return yDiff
            return a.transform[4] - b.transform[4]
        })

        let lines = []
        let currentY = null
        let currentLine = []
        let currentFontSize = null

        for (const item of items) {
            const y = item.transform[5]
            const fontSize = item.transform[0] // approximate scale

            if (currentY === null || Math.abs(currentY - y) < 3) {
                currentLine.push(item.str)
            } else {
                lines.push({
                    text: currentLine.join(' '),
                    fontSize: currentFontSize
                })
                currentLine = [item.str]
            }

            currentY = y
            currentFontSize = fontSize
        }

        if (currentLine.length) {
            lines.push({
                text: currentLine.join(' '),
                fontSize: currentFontSize
            })
        }

        // Convert lines → Markdown
        for (const line of lines) {
            const text = line.text.trim()

            if (!text) continue

            // Heuristic heading detection
            if (line.fontSize > 18) {
                markdown += `# ${text}\n\n`
            } else if (line.fontSize > 14) {
                markdown += `## ${text}\n\n`
            } else {
                markdown += `${text}\n\n`
            }
        }
    }

    return markdown
}

const convertMD = async (infile, outfile, formatOut) => {
    const md = await fs.readFile(infile, 'utf8')
    const html = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(md)

    if (formatOut === 'html') { // MD to HTML
        await fs.writeFile(outfile, String(html), 'utf8')
    } else if (formatOut === 'pdf') { // MD to PFD
        await htmlToPDF(String(html), outfile)
    }
}

const convertHTML = async (infile, outfile, formatOut) => {
    const html = await fs.readFile(infile, 'utf8')

    if (formatOut === 'md') { // HTML to MD
        const markdown = await unified()
            .use(rehypeParse, { fragment: true })
            .use(rehypeRemark)
            .use(remarkStringify)
            .process(html)

        await fs.writeFile(outfile, String(markdown), 'utf8')
    } else if (formatOut === 'pdf') { // HTML to PDF
        await htmlToPDF(html, outfile)
    }
}

const convertPDF = async (infile, outfile, formatOut) => {
    const pdfText = await getTextFromPDF(infile)

    if (formatOut === 'html') { // PDF to HTML
        const html = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(pdfText)
        await fs.writeFile(outfile, String(html), 'utf8')
    } else if (formatOut === 'md') { // PDF to MD
        await fs.writeFile(outfile, pdfText.trim(), 'utf-8')
    }
}

export const markup = async (...args) => {
    const infile = args[0]
    const outfile = args[1]

    if (!infile) { // Check if file given in command line arguments
        logger.warning('No file given!')
        return
    }

    validateFilename(infile, 'markup', 'Wrong filetype for input file!') // Check if infile is supported
    validateFileLocation(infile) // Check if infile exists

    validateFilename(outfile, 'markup', 'Wrong filetype for output file!') // Check if given export file is valid, give custom error if not

    const formatIn = path.extname(infile).replace('.', '')
    const formatOut = path.extname(outfile).replace('.', '')

    if (formatOut === formatIn) {
        logger.warning("File types can't be the same!")
        return
    }

    logger.warning('Converting...')

    try {
        if (formatIn === 'md') {
            await convertMD(infile, outfile, formatOut)
        } else if (formatIn === 'html') {
            await convertHTML(infile, outfile, formatOut)
        } else if (formatIn === 'pdf') {
            await convertPDF(infile, outfile, formatOut)
        }

        logger.success(`${infile} converted to ${outfile}`)
    } catch (error) {
        logger.error('Error duting conversion:', error)
        return
    }
}

