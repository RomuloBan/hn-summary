import { extract, FeedEntry } from "@extractus/feed-extractor";
const RSS_URL = "https://news.ycombinator.com/rss";

export async function getFeed() {
  const data = await extract(RSS_URL, {
    getExtraEntryFields(entryData: any) {
      return {
        comments: entryData.comments,
      };
    },
  });
  return data.entries as (FeedEntry & { comments: string })[];
}
