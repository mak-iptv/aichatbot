const OPENAI_API_KEY = "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"; 

async function fetchPergjigjenEChatbotit(pyetjaEPerdoruesit) {
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "user", "content": pyetjaEPerdoruesit }
        ],
        max_tokens: 150
      })
    });

    if (!response.ok) {
        throw new Error(`Gabim i HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Gabim gjatë thirrjes së API-së së OpenAI:", error);
    return "Gabim në lidhje me AI.";
  }
}
