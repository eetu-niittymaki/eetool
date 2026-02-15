import { writeFile, readFile } from 'node:fs'
import createLogger from '../logger.js'
import { validateFilename, filenames } from '../validators/validateFilename.js'
import { validateFileLocation } from '../validators/validateFileLocation.js'
const logger = createLogger('commands:indentation')

export const indentation = (...args) => {
    const newType = args[0] // i.e --spaces or --tabs
    const file = args[1]

    const types = { 
        '--spaces': ' '.repeat(4), 
        '--tabs': '\t' 
    }

    if (!file) { // Check if file given in command line arguments
        logger.warning('No file given!')
        process.exit(1)
    }

    if (!validateFilename(file)) { // Check if filetype is supported
        logger.warning('Filetype not supported!')
        logger.warning('Supported filetypes:')
        for (let i = 0; i < filenames.length; i += 3) { // Print suppoted filetypes
            process.stdout.write(`${filenames[i]}, ${filenames[i + 1]}, ${filenames[i + 2] || ''}\n`);
        }
        process.exit(1)
    }

    if (!validateFileLocation(file)) { // Check if file actually exists
        logger.warning('File not found!')
        process.exit(1)
    }

    const oldType = (newType === '--spaces') ? '--tabs' : '--spaces'
    readFile(file, 'utf-8', (error, data) => {
        if (error) {
            logger.error(error)
            return
        }
        
        // Replace escaped \t (literal \t, i.e., backslash and t) with an actual tab character
        const escapedPattern = /\\t/g
        const escapedToTab = '\t'

        let newData = data.replace(escapedPattern, escapedToTab)
        const pattern = new RegExp(types[oldType], 'g')
        newData = newData.replace(pattern, types[newType])

        writeFile(file, newData, 'utf-8', (error) => {
            if (error) {
                logger.error(error)
                return
            }
            logger.success(`File ${file} updated successfully!`)
        })
    })
}