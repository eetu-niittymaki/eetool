import sharp from 'sharp'
import path from 'path'
import { validateFilename } from '../validators/validateFilename.js'
import { validateFileLocation } from '../validators/validateFileLocation.js'
import createLogger from '../logger.js'
const logger = createLogger('command:image')

export const image = (...args) => {
    const infile = args[0]
    const outfile = args[1]
    const width = args[2] ? parseInt(args[2], 10) : null
    const height = args[3] ? parseInt(args[3], 10) : null

    if (!infile) { // Check if file given in command line arguments
        logger.warning('No file given!')
        return
    }

    validateFilename(infile, 'image', 'Wrong filetype for input file!') // Check if infile is supported
    validateFileLocation(infile) // Check if infile exists

    validateFilename(outfile, 'image', 'Wrong filetype for output file!') // Check if given export file is valid, give custom error if not

    const format = path.extname(outfile).replace('.', '')
    let outputImage = sharp(infile)

    // Check if only width or only height is given and if they are valid integers
    if (width && !height || !width && height) {
        logger.error('Both width and height must be given as numbers to resize image!')
        return
    } else if (width && height) {
        outputImage = outputImage.resize(width, height)
    }

    outputImage
        .toFile(outfile)
        .then(() => logger.success(`${infile} processed to: ${format.toUpperCase()}`, 
                                    (width && height) ? `${width}x${height}` : '')) // Print new width X height if given
        .catch(error  => logger.error(error))
} 