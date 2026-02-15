import chalk from 'chalk'
import debug from 'debug'

export default function createLogger(name) {
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warning: (...args) => console.log(chalk.yellow(...args)),
    highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
    highlight2: (...args) => console.log(chalk.bgGreen(...args)),
    success: (...args) => console.log(chalk.green(...args)),
    error: (...args) => console.log(chalk.red(...args)),
    debug: debug(name)
  }
}          