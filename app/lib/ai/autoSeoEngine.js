import { decideFixes } from "./decisionEngine";
import { buildPrompt } from "./promptBuilder";
import { applyFix } from "./seoFixer";
import { callOpenAI } from "./gpt";

export async function runAutoFix(scanResult, siteData, userPlan) {

  if (userPlan !== "paid") {
    return { locked: true };
  }

  const fixes = decideFixes(scanResult);
  const appliedFixes = [];

  for (const fix of fixes) {

    const prompt = buildPrompt(fix, {
      url: scanResult.url,
      businessType: scanResult.businessType,
      primaryKeyword: scanResult.keywords[0],
      keywords: scanResult.keywords,
      existingContent: siteData.content
    });

    const aiResponse = await callOpenAI(prompt);

    siteData = await applyFix(fix, aiResponse, siteData);

    appliedFixes.push(fix);
  }

  return {
    success: true,
    appliedFixes,
    updatedSite: siteData
  };
}
