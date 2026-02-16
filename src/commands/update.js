import { execSync, spawn } from 'child_process'
import createLogger from '../logger.js'
const logger = createLogger('command:update')

export const update = () => {
    try {
        execSync('git fetch', {stdio: 'inherit'})
        const status = execSync('git rev-list --count HEAD..@{u}').toString().trim()

        if (Number(status) > 0) {
            logger.warning('Updating...')
            execSync('git pull', { stdio: 'inherit' })
            execSync('npm install', { stdio: 'inherit', shell: true })

            logger.success('Updated successfully!')
        } else {
            logger.success('Already up to date!')
        }
    } catch (error) {
        logger.error('Update failed:', error.message)
    }
}