const capitalizedWord = (word) => {
  const lowercaseWord = word.toLowerCase();

  return lowercaseWord[0].toUpperCase() + lowercaseWord.slice(1);
};

export { capitalizedWord };
