import chalk from 'chalk'

const green = chalk.greenBright
const yellow = chalk.yellowBright
const white = chalk.whiteBright
const blue = chalk.blueBright

export const help = () => {
    console.log(`${white('eetool [CMD]')}
    ${green('--help')}\t${white('eetool --help')}\n\t\t${yellow('Get list of available commands')}
    ${green('--indt')}\t${white('eetool --indt {spaces/tabs} <file>')}\n\t\t${yellow('Converts tabs to spaces and vice versa in given file')}
    ${green('--password')}\t${white('eetool --password {length} {flags}')}\n\t\t${yellow('Randomnly generates a password with a default length of 24')}\n\t\t${blue('Optional flags: -c -> copy to clipboard, -s -> use special characters')}
    ${green('--image')}\t${white('eetool --image <infile, i.e img.jpg> <outfile, i.e img.png> {width} {height}')}\n\t\t${yellow('Reformat images, optionally also resize them if width and height given')}
    ${green('--markup')}\t${white('eetool --markup <infile> <outfile>')}\n\t\t${yellow('Allows conversion between Markup, HTML and PDF files')}
    ${green('--update')}\t${white('eetool --update')}\n\t\t${yellow('Check for and install updates')}
    `)
}