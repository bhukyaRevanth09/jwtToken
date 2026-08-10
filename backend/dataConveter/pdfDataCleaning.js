import { commonCleaner } from "./commonCleaner.js";

export function pdfCleaner(text) {
  return commonCleaner(text)

    // Remove page numbers
    .replace(/^Page\s+\d+$/gim, "")

    // Fix broken words
    .replace(/(\w)-\n(\w)/g, "$1$2")

    // Merge wrapped lines
    .replace(/([a-z])\n([a-z])/g, "$1 $2")

    // Remove repeated separators
    .replace(/[-=*_]{4,}/g, "");
}