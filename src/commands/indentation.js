import { writeFile, readFile } from 'node:fs'
import { validateFilename } from '../validators/validateFilename.js'
import { validateFileLocation } from '../validators/validateFileLocation.js'
import createLogger from '../logger.js'
const logger = createLogger('command:indentation')

export const indentation = (...args) => {
    const newType = args[0] // i.e --spaces or --tabs
    const file = args[1]

    const types = { 
        '--spaces': ' '.repeat(4), 
        '--tabs': '\t' 
    }

    if (!file) { // Check if file given in command line arguments
        logger.warning('No file given!')
        return
    }

    validateFilename(file, "code") // Check if filetype is supported
    if (!validateFileLocation(file)) return  // Check if file actually exists

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