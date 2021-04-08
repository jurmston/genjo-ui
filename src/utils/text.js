/** Formats a string to title case. */
export function titleCase({ value = '', prefixes = [], uppers = [], lowers = [] }) {
  const words = value.split(' ')

  const formattedWords = words.map((word, index) => {
    // Check that word is not empty
    if (word.legnth === 0) {
      return ''
    }

    // Detect if the word is in the uppers group
    // This test goes first since it will have the same effect at any position
    // in the sentence.
    const upperWord = word.toUpperCase()
    if (uppers.includes(upperWord)) {
      return upperWord
    }

    const lowerWord = word.toLowerCase()

    // Check for a prefix match
    for (let prefix of prefixes) {
      const lowerPrefix = prefix.toLowerCase()

      // Rules:
      // 1. The prefix must be at least 2 characters long
      // 2. The target word must be longer than the prefix
      if (prefix.length >= 2 && lowerWord.length > prefix.length && lowerWord.startsWith(lowerPrefix)) {
        return prefix
          + lowerWord[prefix.length].toUpperCase()  // Captialize the remaining word
          + lowerWord.slice(prefix.length + 1) // Append the remaining characters
      }
    }

    // Detect if the word is in the lowers group and not the first word of
    // the sentence (which is always captialized).
    if (index > 0 && lowers.includes(lowerWord)) {
      return lowerWord
    }

    // Capitalize
    return lowerWord[0].toUpperCase() + lowerWord.slice(1)
  })

  return formattedWords.join(' ')
}
