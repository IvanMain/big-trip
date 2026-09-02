const capitalizedWord = (word = '') => {
  const lowercaseWord = word.toLowerCase();

  return lowercaseWord ? lowercaseWord[0].toUpperCase() + lowercaseWord.slice(1) : '';
};

export { capitalizedWord };
