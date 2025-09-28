import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";

export async function getArticleAndSummary(url: string) {
  const response = await fetch(url, {
    cf: {
      cacheTtl: 60 * 60 * 24,
      cacheEverything: true,
    },
  });
  const html = await response.text();
  const { document } = parseHTML(html);
  console.log("DOCUMET", document);
  let reader: Readability | null = null;
  try {
    reader = new Readability(document);
  } catch (error) {
    console.log("Readability error", (error as Error).message, url);
  }
  const article = reader?.parse();

  if (!article?.content) {
    return {
      article: null,
      summary: null,
    };
  }
  return {
    article: article?.content,
    summary: article?.excerpt,
  };
}
