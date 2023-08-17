/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${req.body.prompt}`,
    max_tokens: 100,
    temperature: 1,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
