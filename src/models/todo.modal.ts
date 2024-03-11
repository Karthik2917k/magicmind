import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    todo: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const todoModal = model("todo", todoSchema);
export default todoModal;
