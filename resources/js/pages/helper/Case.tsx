export const ToUpper = (name: string) =>
  name
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
