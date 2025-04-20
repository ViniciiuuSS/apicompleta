import connectDB from "@/lib/mongodb";
import Anotacao from "@/models/Anotacao";

export async function GET() {
  try {
    await connectDB();
    const anotacoes = await Anotacao.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(anotacoes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar anotações:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar anotações" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    const newAnotacao = await Anotacao.create({
      titulo: data.titulo,
      descricao: data.descricao,
    });

    return new Response(JSON.stringify({ success: true, anotacao: newAnotacao }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao salvar anotação:", error);
    return new Response(JSON.stringify({ success: false, error: "Erro ao salvar anotação" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    const updatedAnotacao = await Anotacao.findByIdAndUpdate(data.id, { titulo: data.titulo, descricao: data.descricao }, { new: true });

    if (!updatedAnotacao) {
      return new Response(JSON.stringify({ success: false, error: "Anotação não encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, anotacao: updatedAnotacao }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao atualizar anotação:", error);
    return new Response(JSON.stringify({ success: false, error: "Erro ao atualizar anotação" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    const deletedAnotacao = await Anotacao.findByIdAndDelete(data.id);

    if (!deletedAnotacao) {
      return new Response(JSON.stringify({ success: false, error: "Anotação não encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, anotacao: deletedAnotacao }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao deletar anotação:", error);
    return new Response(JSON.stringify({ success: false, error: "Erro ao deletar anotação" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
