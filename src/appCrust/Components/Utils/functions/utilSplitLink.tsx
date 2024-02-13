export const utilSplitLink = (inputText : string) => {
    // Check if the text contains "https://"
    const indexOfHttps = inputText.indexOf("https://");

    if (indexOfHttps !== -1) {
        // Split the text at the occurrence of "https://"
        const firstString = inputText.substring(0, indexOfHttps);
        const secondString = inputText.substring(indexOfHttps);

        // Return an object with the split strings
        return {
            firstString: firstString,
            secondString: secondString
        };
    } else {
        // If "https://" is not found, return the original text
        return {
            originalText: inputText
        };
    }
}