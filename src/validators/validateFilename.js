import createLogger from '../logger.js'
const logger = createLogger('valdiate:filename')

export const validateFilename = (file, mode, customError='') => {
    const filetypesCode =  ['py', 'js', 'jsx', 'ts', 'jsx', 'java', 'kt', 'c', 'cpp', 'cs', 'php', 'html']
    const filetypesImage = ['jpg', 'png', 'webp', 'gif', 'avif', 'tiff', 'jp2']

    const modes = { 'code': filetypesCode, 'image': filetypesImage }
    const filetypes = modes[mode]

    for (let i = 0; i < filetypes.length; i++) {
        const pattern = new RegExp('.*\\.' + filetypes[i])
        if (pattern.test(file)) { 
            return true
        }
    }

    (!customError) ? logger.error('Filetype not supported!') : logger.error(customError)
    logger.warning('Supported filetypes:')
    for (let i = 0; i < filetypes.length; i += 3) { // Print suppoted filetypes
        process.stdout.write(`${filetypes[i]}, ${filetypes[i + 1]}, ${filetypes[i + 2] || ''}\n`.replace('undefined', ''));
    }

    process.exit(1)
}