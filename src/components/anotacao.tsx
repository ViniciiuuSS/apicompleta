import { useState } from "react";

interface AnotacaoProps {
  _id?: string;
  numero: number;
  titulo: string;
  descricao: string;
  isIncluido: boolean;
}

export function Anotacao({ _id, numero, titulo, descricao, isIncluido }: AnotacaoProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [tituloAnotacao, setTituloAnotacao] = useState(titulo);
  const [descricaoAnotacao, setDescricaoAnotacao] = useState(descricao);
  const [isVisible, setIsVisible] = useState(true);

  const handleSave = async () => {
    if (!tituloAnotacao.trim()) {
      setStatus("error");
      setMessage("O título é obrigatório");
      return;
    }

    setStatus("saving");

    try {
      const response = await fetch("/saveAnotacao", {
        method: !isIncluido ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          titulo: tituloAnotacao,
          descricao: descricaoAnotacao,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Anotação salva com sucesso!");
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao salvar anotação");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao conectar com o servidor");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!_id) return;

    setStatus("saving");

    try {
      const response = await fetch("/saveAnotacao", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: _id }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Anotação deletada com sucesso!");
        setIsVisible(false);
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao deletar anotação");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao conectar com o servidor");
      console.error(error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 h-full animate-fade-in">
      <h1 className="text-2xl font-bold py-5 text-center">Anotação #{numero}</h1>
      <input type="text" onChange={(e) => setTituloAnotacao(e.target.value)} value={tituloAnotacao} placeholder="Título" className="w-full border-2 border-gray-300 rounded-lg p-2 mb-2" />
      <textarea onChange={(e) => setDescricaoAnotacao(e.target.value)} value={descricaoAnotacao} placeholder="Descrição" className="w-full border-2 border-gray-300 rounded-lg p-2 mb-2 min-h-20" />

      {status !== "idle" && <div className={`w-full p-2 mb-2 rounded-lg text-center ${status === "success" ? "bg-green-100 text-green-800" : status === "error" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>{status === "saving" ? "Salvando..." : message}</div>}

      <div className="flex flex-row gap-2">
        <button onClick={handleSave} disabled={status === "saving"} className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${status === "saving" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
          {status === "saving" ? "Salvando..." : "Salvar"}
        </button>
        <button onClick={handleDelete} disabled={status === "saving"} className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${status === "saving" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}`}>
          Deletar
        </button>
      </div>
    </div>
  );
}
