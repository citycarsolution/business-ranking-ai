export async function applyFix(type, aiOutput, siteData) {

  switch (type) {

    case "meta_description":
      siteData.meta.description = aiOutput;
      break;

    case "title":
      siteData.title = aiOutput;
      break;

    case "content_improvement":
      siteData.content = aiOutput;
      break;

    case "keyword_alignment":
      siteData.keywordMap = JSON.parse(aiOutput);
      break;
  }

  return siteData;
}
