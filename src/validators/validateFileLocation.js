import { existsSync } from 'node:fs'
import createLogger from '../logger.js'
const logger = createLogger('validate:fileLocation')

export const validateFileLocation = (file) => { 
    if (existsSync(file)) {
        return true
    }

    logger.error('File not found!')
    return false
}
