export const filenames =  ['py', 'js', 'jsx', 'ts', 'jsx', 'java', 'kt', 'c', 'cpp', 'cs', 'php', 'html']

export const validateFilename = (file) => {
    for (let i = 0; i < filenames.length; i++) {
        const pattern = new RegExp('.*\\.' + filenames[i])
        if (pattern.test(file)) return true
    }
}