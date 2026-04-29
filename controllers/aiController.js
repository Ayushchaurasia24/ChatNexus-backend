import { getAIResponse } from "../utils/openai.js";

export const getSuggestions = async (req, res) => {
  try {
    const { text, lastMessage } = req.body;

    // ✅ Safe inputs (avoid empty prompts)
    const safeText = text || "Hi";
    const safeLastMessage = lastMessage || "Hello";

    // ✅ Strong prompt (forces structured output)
    const prompt = `
You are a smart chat assistant.

STRICT RULES:
- Return ONLY valid JSON
- No explanation, no extra text
- Always return exactly 3 predictions and 3 replies

Format:
{
  "predictions": ["...", "...", "..."],
  "replies": ["...", "...", "..."]
}

User typing: "${safeText}"
Last message: "${safeLastMessage}"
`;

    const aiResponse = await getAIResponse(prompt);

    console.log("RAW GEMINI RESPONSE:", aiResponse);

    // ❌ If Gemini fails
    if (!aiResponse) {
      return res.json(getFallback());
    }

    // ✅ Extract JSON safely
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.json(getFallback());
    }

    let parsed;

    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (err) {
      return res.json(getFallback());
    }

    // ✅ Validate structure
    if (
      !parsed.predictions ||
      !parsed.replies ||
      parsed.predictions.length === 0 ||
      parsed.replies.length === 0
    ) {
      return res.json(getFallback());
    }

    return res.json(parsed);
  } catch (error) {
    console.log("AI ERROR:", error);
    return res.status(500).json(getFallback());
  }
};

// ✅ Fallback (VERY IMPORTANT for UX)
const getFallback = () => {
  return {
    predictions: ["Okay", "Sounds good", "Let's do it"],
    replies: ["Yes", "No", "Maybe later"],
  };
};