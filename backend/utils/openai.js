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
            content: `
              You are a code generator that creates clean and minimal React (JSX) UI components based on user input. 

              Respond with the following three sections, all enclosed in appropriate code blocks:

              1. A **React JSX component** (using functional components and hooks if needed)
              2. The **CSS styles** (if not using Tailwind CSS)
              3. A **fully functional HTML snippet** that looks like the component for preview purposes (assume scripts and styles are already loaded) without any script just style tag with given css, given with html tags.

              Do not include any explanations. Only provide code blocks in this order: JSX, CSS (if any), HTML preview.
              `.trim(),
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
