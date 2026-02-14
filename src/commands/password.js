import crypto from 'crypto'

export const password = (...args) => {
    const length = parseInt(args[0]) || 24

    const special = "&€$%@-+=^!?"
    const letters = "abcdefghijklmnopqrstuvwxyz"
    const lengthLetters = letters.length - 1
    const lengthSpecial = special.length - 1
    let word = ""

    while (word.length < length) {
        const dice = crypto.randomInt(1, 11)

        if (dice <= 5) {
            // Choose a letter
            let letter = letters[crypto.randomInt(0, lengthLetters + 1)]

            // Randomly decide if we should use uppercase
            if (Math.random() < 0.2) {
                letter = letter.toUpperCase()
            }
            word += letter;
        } else if (dice > 5 && dice <= 7) {
            // Choose a special character
             word += special[crypto.randomInt(0, lengthSpecial + 1)]
        } else {
            // Choose a number if allowed
            word += crypto.randomInt(0, 10).toString()
        }
    }

    console.log(word)
}
