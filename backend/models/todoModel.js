const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Pls add a text value"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", todoSchema);
