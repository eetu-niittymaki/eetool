import chalk from 'chalk'

export const help = () => {
    console.log(`${chalk.whiteBright('eetool [CMD]')}
    ${chalk.greenBright('--tabs')}\tConverts spaces to tabs in given file. eetool --tabs <file>
    ${chalk.greenBright('--spaces')}\tConverts tabs to spaces in given file. eetool --spaces <file> 
    ${chalk.greenBright('--password')}\tRandomnly generates a password with a default length of 24, optional flags: -c = Copy to clipboard. eetool --password <length> {flags}
    `)
}