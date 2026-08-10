export const mdCleaner = (text) => {
    return text
        .normalize("NFKC")
        // Remove Markdown headings (# ## ### #### ##### ######)
        .replace(/^#{1,6}\s*/gm, "")
        // Line endings
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")

        // Invisible characters
        .replace(/[\u200B-\u200D\uFEFF]/g, "")

        // Code fences
        .replace(/```[\w-]*\n?/g, "")
        .replace(/```/g, "")

        // HTML
        .replace(/<[^>]+>/g, "")

        // Images
        .replace(/!\[(.*?)\]\((.*?)\)/g, "$1")

        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")

        // Reference links
        .replace(/^\[[^\]]+\]:\s+.*$/gm, "")

        // Bold / Italic
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/__(.*?)__/g, "$1")
        .replace(/_(.*?)_/g, "$1")
        .replace(/~~(.*?)~~/g, "$1")

        // Blockquotes
        .replace(/^>\s?/gm, "")

        // Markdown bullets
        .replace(/^\s*[-*+]\s+/gm, "")

        // Task lists
        .replace(/^\s*[-*]\s+\[[ xX]\]\s+/gm, "")

        // Tables
        .replace(/\|/g, " ")

        // Horizontal rules
        .replace(/^([-*_]){3,}$/gm, "")

        // Tabs
        .replace(/\t/g, " ")

        // Multiple spaces
        .replace(/ {2,}/g, " ")

        // Blank lines
        .replace(/\n{3,}/g, "\n\n")

        // Normalize times
        .replace(/(\d{1,2})\s*:\s*(\d{2})/g, "$1:$2")

        .trim();
};