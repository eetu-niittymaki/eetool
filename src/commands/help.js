import chalk from 'chalk'

export const help = () => {
    console.log(`${chalk.whiteBright('eetool [CMD]')}
    ${chalk.greenBright('--help')}\tGet list of available commands
    ${chalk.greenBright('--tabs')}\tConverts spaces to tabs in given file:\n\t\teetool --tabs <file>
    ${chalk.greenBright('--spaces')}\tConverts tabs to spaces in given file: \n\t\teetool --spaces <file> 
    ${chalk.greenBright('--password')}\tRandomnly generates a password with a default length of 24: \n\t\teetool --password <length> {flags}. \n\t\tOptional flags: -c -> copy to clipboard, -s -> use special characters
    ${chalk.greenBright('--image')}\tReformat images, optionally also resize them: \n\t\teetool --image <original file, i.e img.jpg> <output file and type, i.e img.png> {optional width} {optional height}.
    `)
}