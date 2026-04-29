import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // cheap + fast
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log("OpenAI error:", error.message);
    return null;
  }
};