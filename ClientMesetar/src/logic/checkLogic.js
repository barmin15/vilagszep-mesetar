//checks if a string only has whitespaces
export const onlyWhitespaces = (elem) => {
    const isWhitespaceString = str => !/\S/.test(str)
    return isWhitespaceString(elem);
}