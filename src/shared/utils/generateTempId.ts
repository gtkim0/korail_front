export const generateTempId = () => {
  return `temp-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}