const OpenAI = require('openai');

// Initialize OpenAI with the API key and optional organization/project
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Store your API key as an environment variable in Netlify
  organization: process.env.OPENAI_ORGANIZATION,  // Optional: if using organization/project
  project: process.env.OPENAI_PROJECT_ID,  // Optional: if using a specific project
});

exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const userMessage = body.query;

    try {
        // Create a chat completion using the correct model
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",  // Use the new gpt-4o-mini model as per the latest API docs
            messages: [
                { role: "user", content: userMessage }
            ],
            temperature: 0.7  // You can adjust the temperature based on your needs
        });

        const aiReply = completion.choices[0].message.content;

        // Log the x-request-id for troubleshooting purposes
        console.log(`Request ID: ${completion.id}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: aiReply })
        };
    } catch (error) {
        // Catch errors and log them
        console.error('Error fetching completion:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch completion" })
        };
    }
};
