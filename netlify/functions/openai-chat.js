const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const userMessage = body.query;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-latest",  // Replace with the exact new GPT-4 model you want to use
            messages: [
                { role: "user", content: userMessage }
            ]
        });

        const aiReply = completion.choices[0].message.content;

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: aiReply })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch completion" })
        };
    }
};
