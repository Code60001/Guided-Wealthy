import mongoose from "mongoose";

const retirementAnalysisSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inputs: {
      type: Object,
      required: true,
    },
    incomeCheckpoints: {
      type: Array,
      required: true,
    },
    results: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RetirementAnalysis = mongoose.model("RetirementAnalysis", retirementAnalysisSchema);

export default RetirementAnalysis;
