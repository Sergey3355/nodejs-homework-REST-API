const { Schema, model } = require("mongoose");

const mySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const MyModel = model("contacts", mySchema);

module.exports = MyModel;
