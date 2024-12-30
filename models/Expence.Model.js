import mongoose from "mongoose";

const expenceSchema = new mongoose.Schema(
  {
   name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description:{
        type: String,
        required: true,
    }

  },
  {
    timestamps: true,
  }
);

const Expence = mongoose.model("Expences", expenceSchema);

export default Expence;
