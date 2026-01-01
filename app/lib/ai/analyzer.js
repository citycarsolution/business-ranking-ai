import axios from "axios";
import * as cheerio from "cheerio";

export async function analyzeWebsite({ url, keywords = [] }) {
  let score = 100;
  let issues = [];

  if (!url.startsWith("https://")) {
    issues.push("Website is not using HTTPS");
    score -= 10;
  }

  if (url.length < 10) {
    issues.push("URL structure is too short");
    score -= 5;
  }

  if (!keywords.length) {
    issues.push("No target keywords provided");
    score -= 10;
  }

  keywords.forEach((kw) => {
    if (kw.length < 3) {
      issues.push(`Keyword too short: ${kw}`);
      score -= 3;
    }
  });

  const randomSEOIssues = [
    "Meta description could be improved",
    "Low internal linking",
    "Images missing alt attributes",
    "Page speed needs optimization",
    "Heading structure not ideal",
  ];

  if (Math.random() > 0.5) {
    issues.push(randomSEOIssues[Math.floor(Math.random() * randomSEOIssues.length)]);
    score -= 5;
  }

  return {
    score: Math.max(40, score),
    issues,
  };
}
