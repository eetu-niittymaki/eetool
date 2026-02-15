#!/usr/bin/env node
import arg from 'arg'
import chalk from 'chalk'
import createLogger from '../src/logger.js'
//import { getConfig } from '../src/config/config-mngr.js'
import { indentation } from '../src/commands/indentation.js'
import { help } from '../src/commands/help.js'
import { password } from '../src/commands/password.js'
const logger = createLogger('bin')

try {
    const args = arg({
        '--help': Boolean,
        '--tabs': Boolean,
        '--spaces': Boolean,
        '--password': Boolean,
        '-c': Boolean
    })

    logger.debug('Received args', args)

    if (args['--help']) {
        help()
    } else if (args['--spaces'] || args['--tabs']) {
        indentation(process.argv[2], process.argv[3], process.argv[4])
    } else if (args['--password']) {
        password(process.argv[3], process.argv[4], process.argv[5])
    }

} catch (e) {
    logger.warning(e.message)
    console.log()
    console.log(`${chalk.whiteBright('Unknown command, use --help to get list of available commands')}`)
}

