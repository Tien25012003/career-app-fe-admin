export const isValidContentWithHTML = (htmlString: string) => {
  const regex = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
  const match = htmlString.match(regex);
  return match && match[2].trim() !== '';

  // <p></p> => false
  // <p>aaaa</p> => true
};
