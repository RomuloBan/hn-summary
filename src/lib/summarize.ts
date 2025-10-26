export default async function summarize(ai: Ai, content: string) {
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
}
