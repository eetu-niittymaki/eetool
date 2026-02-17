import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import createLogger from '../logger.js'
const logger = createLogger('command:update')

export const update = () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const mainDirectory = path.join(__dirname, '../../') // Directory where .git is

    try {
        execSync('git fetch', { 
            cwd: mainDirectory, // cwd to point commands to proper directory, not where command script is located 
            stdio: 'inherit'
        })
        const status = execSync(
            'git rev-list --count HEAD..@{u}', // Get remote head and check if local ref is behind
            { cwd: mainDirectory })
            .toString()
            .trim()

        if (Number(status) > 0) {
            logger.warning('Updating...')

            execSync('git pull', { 
                cwd: mainDirectory,
                stdio: 'inherit' 
            })
            
            execSync('npm install', { 
                cwd: mainDirectory,
                stdio: 'inherit', 
                shell: true 
            })

            logger.success('Updated successfully!')
        } else {
            logger.success('Already up to date!')
        }
    } catch (error) {
        logger.error('Update failed:', error.message)
    } 
}