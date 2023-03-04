const dotenv = require("dotenv");

dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const { openAiHelper } = require("../utils/utils");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const block = require("../model/blocks");
const openai = new OpenAIApi(configuration);
console.log(process.env.OPENAI_API_KEY);
// openai.apiKey = process.env.OPENAI_API_KEY;
const gptPrompts = require("../default.json");
function removeNewline(str) {
  return str.replace(/\n/g, "");
}
function replaceHeadingWithHii(data, varr) {
  const openingTag = data.substring(0, data.indexOf(">") + 1);
  const closingTag = data.substring(data.lastIndexOf("<"));
  return openingTag + varr + closingTag;
}
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
    const { id } = req.params;
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
    const headingText = removeNewline(heading?.data?.choices[0].text);
    const inputDescription =
      req.body.inputDescription || gptPrompts.description.defaut;
    const instructionsDescription =
      req.body.instructionsDescription || gptPrompts.description.prompt;
    const DescriptionToken = gptPrompts.description.tokens;
    // console.log(inputDescription, "-----------------");
    const description = await openAiHelper(
      inputDescription,
      instructionsDescription,
      DescriptionToken,
      0.2
    );
    let descText = removeNewline(description?.data?.choices[0].text);
    descText = `<h1>${descText}</h1>`;
    console.log(descText, "---------------------------------");
    // <h1>heading?.data?.choices[0]</h1>
    const foundBlock = await block.findById(id);
    const html = foundBlock.html;
    const myData = replaceHeadingWithHii(html, headingText);
    console.log(description?.data?.choices[0]);
    res.status(200).json({
      myData,
      heading: headingText,
      description: descText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
