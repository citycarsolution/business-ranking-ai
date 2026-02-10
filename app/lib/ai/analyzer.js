export function analyzeSEO(html = "") {
  let score = 0;
  let issues = [];

  if (html.includes("<title>")) score += 20;
  else issues.push("Missing title tag");

  if (html.includes("meta")) score += 20;
  else issues.push("Missing meta description");

  if (html.includes("<h1")) score += 20;
  else issues.push("Missing H1 tag");

  score += 20; // performance base

  return {
    score,
    issues
  };
}
