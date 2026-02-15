import crypto from 'crypto'
import clipboardy from 'clipboardy'
import createLogger from '../logger.js'
const logger = createLogger('command:password')

export const password = (...args) => {
    const length = parseInt(args[0]) || 24
    const copyToClipboardFlag = args.slice(1).includes('-c') // Check if args after [0] contain -c flag

    const special = '&€$%@-+=^!?'
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    const lengthLetters = letters.length - 1
    const lengthSpecial = special.length - 1
    let word = ''

    while (word.length < length) {
        const dice = crypto.randomInt(1, 11)

        if (dice <= 5) {
            let letter = letters[crypto.randomInt(0, lengthLetters + 1)] // Choose a letter
            if (Math.random() < 0.2) { // Randomly decide if to use uppercase
                letter = letter.toUpperCase()
            }
            word += letter;
        } else if (dice > 5 && dice <= 7) {
            word += special[crypto.randomInt(0, lengthSpecial + 1)] // Choose a special character
        } else {
            word += crypto.randomInt(0, 10).toString() // Choose a number
        }
    }

    logger.success('\n', word)

    if (copyToClipboardFlag) {
        try {
            clipboardy.writeSync(word);
            logger.highlight2('\nPassword copied to clipboard!')
        } catch (error) {
            logger.error(error)
        }
    }
}
