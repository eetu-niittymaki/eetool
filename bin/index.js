#!/usr/bin/env node
import arg from 'arg'
import chalk from 'chalk'
import createLogger from '../src/logger.js'
//import { getConfig } from '../src/config/config-mngr.js'
import { indentation } from '../src/commands/indentation.js'
import { help } from '../src/commands/help.js'
import { password } from '../src/commands/password.js'
import { image } from '../src/commands/image.js'
const logger = createLogger('bin')

try {
    const args = arg({
        // Main commands
        '--help': Boolean,
        '--tabs': Boolean,
        '--spaces': Boolean,
        '--password': Boolean,
        '--image': Boolean,
        // Flags
        '-c': Boolean,
        '-s': Boolean
    })

    logger.debug('Received args', args)

    const commandMap = {
        '--help': () => help(),
        '--tabs': () => indentation(process.argv[2], process.argv[3], process.argv[4]),
        '--spaces': () => indentation(process.argv[2], process.argv[3], process.argv[4]),
        '--password': () => password(process.argv[3], process.argv[4], process.argv[5]),
        '--image': () => image(process.argv[3], process.argv[4], process.argv[5])
    }

    // Find matching command in args
    const command = Object.keys(args).find(key => args[key] && commandMap[key])

    if (commandMap[command]) {
        commandMap[command]()
    }

} catch (e) {
    logger.warning(e.message)
    console.log()
    console.log(`${chalk.whiteBright('Unknown command, use --help to get list of available commands')}`)
}

