import { findDocuments, insertDocument, updateDocument, deleteDocument } from "@/lib/mongodbApi";

const DATABASE = "anotacoes";
const COLLECTION = "anotacoes";

export async function GET() {
  try {
    const anotacoes = await findDocuments(DATABASE, COLLECTION);
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
    const data = await request.json();

    const result = await insertDocument(DATABASE, COLLECTION, {
      titulo: data.titulo,
      descricao: data.descricao,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, anotacao: result }), {
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
    const data = await request.json();

    const result = await updateDocument(DATABASE, COLLECTION, { _id: { $oid: data.id } }, { titulo: data.titulo, descricao: data.descricao });

    if (!result.matchedCount) {
      return new Response(JSON.stringify({ success: false, error: "Anotação não encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, anotacao: result }), {
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
    const data = await request.json();

    const result = await deleteDocument(DATABASE, COLLECTION, { _id: { $oid: data.id } });

    if (!result.deletedCount) {
      return new Response(JSON.stringify({ success: false, error: "Anotação não encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, anotacao: result }), {
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
