import chalk from 'chalk'
import createLogger from "../logger.js"
const logger = createLogger('commands:help')

export const help = () => {
    console.log(`${chalk.whiteBright('eetool [CMD]')}
    ${chalk.greenBright('--tabs')}\tConverts spaces to tabs in given file: eetool --tabs <file>
    ${chalk.greenBright('--spaces')}\tConverts tabs to spaces in given file: eetool --spaces <file> 
    ${chalk.greenBright('--password')}\tRandomnly generates a password with a default length of 24: eetool --password <length>
    `)
}