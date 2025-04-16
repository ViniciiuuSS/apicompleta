"use client";
import { MenuOpcoes } from "@/components/menuopcoes";
import { Anotacao } from "@/components/anotacao";
import { useEffect, useState } from "react";
import React from "react";
import { SpinnerComponent } from "@/components/spinner";

export default function Home() {
  const [anotacoes, setAnotacoes] = useState<React.ReactElement[]>([]);
  const [loading, setLoading] = useState(true);
  
  const handleClick = () => {
    const novoNumero = anotacoes.length + 1;
    setAnotacoes([...anotacoes, <Anotacao key={novoNumero} numero={novoNumero} titulo={''} descricao={''} isIncluido={false} />]);
  };
  useEffect(() => {
    const fetchAnotacoes = async () => {
      try {
        const response = await fetch('/saveAnotacao', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setAnotacoes(data.map((item: { id: string; titulo: string; descricao: string }, index: number) => 
          <Anotacao 
            key={item.id} 
            numero={index + 1} 
            titulo={item.titulo} 
            descricao={item.descricao} 
            isIncluido={true} 
          />
        ));
        if(data.length === 0){
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar anotações:', error);
      }
    };
    fetchAnotacoes();
  }, []);
  
  if(anotacoes.length === 0 && loading){
    return <SpinnerComponent />
  }
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 pt-20 pb-20">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold py-5 text-center">Minhas Anotações</h1>
          <div className="flex justify-center mb-8">
            <MenuOpcoes onClick={handleClick} />
          </div>
          {anotacoes.length === 0 && (
            <div className="text-center text-gray-500">
              Nenhuma anotação encontrada, clique no botão acima para criar uma nova anotação.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anotacoes}
          </div>
        </div>
      </main>
    </div>
  );
}
