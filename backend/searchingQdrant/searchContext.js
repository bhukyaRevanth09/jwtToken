export function buildContext(results) {
    return results
        .map(({ payload }, index) => {
            return `
===== SOURCE ${index + 1} =====

Document: ${payload.fileName}
Section: ${payload.heading}
Page: ${payload.page ?? "N/A"}

${payload.text}
`.trim();
        })
        .join("\n\n");
}