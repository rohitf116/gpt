const dotenv = require("dotenv");

dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const { openAiHelper } = require("../utils/utils");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
console.log(process.env.OPENAI_API_KEY);
// openai.apiKey = process.env.OPENAI_API_KEY;
const gptPrompts = require("../default.json");

exports.openAi = async (req, res) => {
  try {
    // Get input and instructions from request body
    const input = req.body.input || gptPrompts.headline.defaut;
    const instructions = req.body.instructions || gptPrompts.headline.prompt;
    const prompt = input + " " + instructions;
    async function runCompletion() {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 100,
      });
      return completion;
    }
    const reso = await runCompletion();
    console.log(reso);
    res.status(200).json({ text: reso.data.choices[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

exports.openAi2 = async (req, res) => {
  //   console.log(gptPrompts);
  try {
    // const tttt = gptPrompts.map((cmd) => {
    //   command = cmd.prompt;
    //   token = cmd.tokens;
    //   // const result = await openAiHelper(command, "test", token, 0.2);
    //   // console.log(result);
    //   return;
    // });
    console.log(tttt);
    // heading
    const inputHeading = req.body.inputHeading || gptPrompts.headline.defaut;
    const instructionsHeading =
      req.body.instructionsHeading || gptPrompts.headline.prompt;
    const headingToken = gptPrompts.headline.tokens;
    const heading = await openAiHelper(
      inputHeading,
      instructionsHeading,
      headingToken,
      0.3
    );

    const inputDescription =
      req.body.instructionsDescription || gptPrompts.description.defaut;
    const instructionsDescription =
      req.body.instructionsDescription || gptPrompts.description.prompt;
    const DescriptionToken = gptPrompts.description.tokens;
    const description = await openAiHelper(
      inputDescription,
      instructionsDescription,
      DescriptionToken,
      0.2
    );
    res.status(200).json({
      heading: heading?.data?.choices[0],
      description: description?.data?.choices[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
