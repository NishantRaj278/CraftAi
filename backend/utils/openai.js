import dotenv from "dotenv";
dotenv.config();

export async function generateComponent(prompt) {
  const API_KEY = process.env.OPENROUTER_API_KEY; // Or hardcode for testing
  const MODEL = "openai/gpt-4o"; // Or another model like 'mistralai/mistral-7b-instruct'

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // 🔹 your frontend domain or localhost
        "X-Title": "AI-Component-Builder", // 🔹 optional but required by OpenRouter
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a code generator that creates clean React (JSX) UI components and accompanying CSS based on user input. Respond with only code blocks.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 1000,
      }),
    });

    const data = await res.json();

    const aiMessage = data.choices?.[0]?.message?.content;
    return aiMessage || null;
  } catch (err) {
    console.error("Error generating component:", err);
    return null;
  }
}
