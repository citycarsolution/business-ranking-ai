export function buildPrompt(type, data) {
  switch (type) {

    case "meta_description":
      return `
You are an expert SEO AI.

Website URL: ${data.url}
Business Type: ${data.businessType}

Task:
Generate an SEO optimized meta description:
- 150–160 characters
- Clear value proposition
- Include primary keyword: "${data.primaryKeyword}"
- Natural, human-readable
Return ONLY the meta description text.
`;

    case "title":
      return `
You are an advanced SEO AI.

Website URL: ${data.url}

Task:
Generate an optimized SEO title:
- 50–60 characters
- Include main keyword: "${data.primaryKeyword}"
- Brand friendly
Return ONLY the title text.
`;

    case "content_improvement":
      return `
You are a professional SEO content optimizer.

Existing Content:
${data.existingContent}

Task:
Improve content by:
- Increasing SEO depth
- Adding clear headings
- Improving readability
- Avoid keyword stuffing
Return improved content in HTML format.
`;

    case "keyword_alignment":
      return `
You are an SEO strategist AI.

Keywords:
${data.keywords.join(", ")}

Task:
Suggest keyword placement:
- Title
- H1
- H2
- Paragraphs
Return structured JSON.
`;

    default:
      return "";
  }
}
