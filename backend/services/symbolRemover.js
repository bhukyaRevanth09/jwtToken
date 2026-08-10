export const cleanContext =(text)=>{  return text
    .replace(/===== SOURCE \d+ =====/g, "")
    .replace(/Document:\s*.*\n/g, "")
    .replace(/Section:\s*.*\n/g, "")
    .replace(/Page:\s*\d+\n/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}