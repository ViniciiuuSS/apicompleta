import mongoose from "mongoose";

const AnotacaoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "Por favor, forneça um título"],
  },
  descricao: {
    type: String,
    required: [true, "Por favor, forneça uma descrição"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Anotacao || mongoose.model("Anotacao", AnotacaoSchema);
