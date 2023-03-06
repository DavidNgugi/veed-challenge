export const convertToKMB = (count) => {
  if(!count) return 0;
  const abbreviations = ["", "k", "m", "b", "t"];
  const sign = Math.sign(count);
  const absCount = Math.abs(count);
  const logCount = Math.floor(Math.log10(absCount) / 3);
  const abbreviation = abbreviations[logCount];
  const scaledCount = absCount / Math.pow(10, logCount * 3);
  const formattedCount = sign * scaledCount.toFixed(1);
  return `${formattedCount}${abbreviation}`;
};

export const capParagraph = (paragraph, length=50) => {
  return paragraph.length > length
    ? paragraph.substring(0, length) + "..."
    : paragraph;
};
