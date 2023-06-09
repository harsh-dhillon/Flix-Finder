import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    'OpenAI API key not configured, please follow instructions in README.md',
            },
        });
        return;
    }

    const prompt = req.body.prompt || '';
    if (prompt.trim().length === 0) {
        res.status(400).json({
            error: {
                message: 'Please enter valid movie preferences',
            },
        });
        return;
    }

    // Add a random factor to the prompt
    const randomFactor = Math.floor(Math.random() * 100);

    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Suggest 5 movies for someone who likes: ${prompt}, in format title (release year). Random factor: ${randomFactor}`,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.7,
        });
        res.status(200).json({ data: completion.data.choices[0].text.trim() });
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                },
            });
        }
    }
}
