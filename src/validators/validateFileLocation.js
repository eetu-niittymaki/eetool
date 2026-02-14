import { existsSync } from 'node:fs'

export const validateFileLocation = (file) => { return existsSync(file) }
