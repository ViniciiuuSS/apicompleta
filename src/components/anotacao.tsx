import { useState } from "react";

export function Anotacao({ numero }: { numero: number }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!titulo.trim()) {
      setStatus('error');
      setMessage('O título é obrigatório');
      return;
    }

    setStatus('saving');
    
    try {
      const response = await fetch('/saveAnotacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, descricao, numero })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setMessage('Anotação salva com sucesso!');
        // Limpa os campos após salvar com sucesso
        setTitulo('');
        setDescricao('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao salvar anotação');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 h-full">
      <h1 className="text-2xl font-bold py-5 text-center">Anotação #{numero}</h1>
      <input 
        type="text" 
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)} 
        placeholder="Título" 
        className="w-full border-2 border-gray-300 rounded-lg p-2 mb-2" 
      />
      <textarea 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)} 
        placeholder="Descrição" 
        className="w-full border-2 border-gray-300 rounded-lg p-2 mb-2 min-h-20" 
      />
      
      {status !== 'idle' && (
        <div className={`w-full p-2 mb-2 rounded-lg text-center ${
          status === 'success' ? 'bg-green-100 text-green-800' : 
          status === 'error' ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {status === 'saving' ? 'Salvando...' : message}
        </div>
      )}
      
      <button 
        onClick={handleSave} 
        disabled={status === 'saving'}
        className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
          status === 'saving' 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {status === 'saving' ? 'Salvando...' : 'Salvar'}
      </button>
    </div>
  );
}

