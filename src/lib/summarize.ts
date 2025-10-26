export default async function summarize(ai: Ai, url: string, content: string) {
  const doWork = async () => {
    const answer = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", {
      raw: true,
      messages: [
        {
          role: "user",
          content: `Summarize the following: ${content}`,
        },
      ],
      lora: "cf-public-cnn-summarization",
    });
    return answer.response || "";
  };

  let maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const result = await doWork();
      console.log("Summarized", url);
      return result;
    } catch (error) {
      console.log("Error summarizing:", url, (error as Error).message);
      if (retries < maxRetries) {
        retries += 1;
      }
    }
  }
  console.log("Error retries reached:", url);
  return `Unable to summarize. Max retries reached.`;
}
