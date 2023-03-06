export const convertToKMB = (number) => {
  if (number < 1000) return `${number}`;
  const suffixes = ['', 'k', 'm', 'b', 't'];
  let suffixIndex = 0;
  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    suffixIndex++;
    number /= 1000;
  }
  return `${number.toFixed(1)}${suffixes[suffixIndex]}`;
}

export const capParagraph = (paragraph, length = 50) => {
  return paragraph.length > length
    ? paragraph.substring(0, length) + "..."
    : paragraph;
};
