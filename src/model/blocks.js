const mongoose = require("mongoose");
const planIds = [
  { id: "plan_LLPhcq8LeSje1C", planName: "Basic" },
  { id: "plan_LLPiYsLvNYcv8D", planName: "Basic_Yearly" },
  { id: "plan_LLPjUpm5VtPJiY", planName: "Advance" },
  { id: "plan_LLPkL69Ziy2g2s", planName: "Advance_Yearly" },
  { id: "plan_LLPkx0zjRZc8nq", planName: "Expert" },
  { id: "plan_LLPoo2rWZyTwlf", planName: "Expert_Yearly" },
].map((ele) => ele.id);
const blockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
      maxlength: [25, "Name can not be more than 50 chars"],
    },
    imageUrl: {
      type: String,
    },
    html: {
      type: String,
    },
    css: String,
    script: String,
    categories: {
      type: [String],
    },
    planUsage: {
      type: String,
      enum: planIds,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Block", blockSchema);
