import sharp from 'sharp'
import { validateFilename } from '../validators/validateFilename.js'
import { validateFileLocation } from '../validators/validateFileLocation.js'
import createLogger from '../logger.js'
const logger = createLogger('command:image')

export const image = (...args) => {
    const infile = args[0]
    const outfile = args[1]

    if (!infile) { // Check if file given in command line arguments
        logger.warning('No file given!')
        process.exit(1)
    }

    if (!validateFilename(infile, 'image', 'Wrong filetype for input file!')) process.exit(1) // Check if infile is supported
    validateFileLocation(infile) // Check if infile exists

    validateFilename(outfile, 'image', 'Wrong filetype for output file!') // Check if given export file is valid, give custom error if not

    const format = outfile.split('.')[1]
    sharp(infile)
        .toFormat(format)
        .toFile(outfile), (err, info) => {
            if(err) logger.error(err)
            return 
        }
    logger.success(`Converted to ${format.toUpperCase()}`)
} 