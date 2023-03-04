const dotenv = require("dotenv");

dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-lCQdEAKRiHgA4MLBqn3Ng2ji",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// openai.apiKey = process.env.OPENAI_API_KEY;
// console.log(process.env.OPENAI_API_KEY);
exports.openAiHelper = async (input, instructions, max_tokens, temperature) => {
  try {
    // Get input and instructions from request body

    const prompt = input + " " + instructions;
    async function runCompletion() {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature,
        max_tokens,
      });
      return completion;
    }
    const reso = await runCompletion();

    return reso;
  } catch (error) {
    console.log(error);
    return error;
  }
};
