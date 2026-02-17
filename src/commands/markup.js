import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import { validateFilename } from '../validators/validateFilename.js'
import { validateFileLocation } from '../validators/validateFileLocation.js'
import createLogger from '../logger.js'
const logger = createLogger('command:markup')

export const markup = (...args) => {
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

    if (formatIn === 'md') {
        convertMD(infile, outfile)
    } else if (formatIn === 'html') {
        convertHTML(infile, outfile)
    } else if (formatIn === 'pdf') {
       convertPDF(infile, outfile)
    }
}

function convertMD(infile, outfile) {

}

function convertHTML(infile, outfile) {
    
}

function convertPDF(infile, outfile) {
    
}