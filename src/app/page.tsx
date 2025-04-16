"use client";
import { MenuOpcoes } from "@/components/menuopcoes";
import { Anotacao } from "@/components/anotacao";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [anotacoes, setAnotacoes] = useState<React.ReactElement[]>([]);

  const handleClick = () => {
    const novoNumero = anotacoes.length + 1;
    setAnotacoes([...anotacoes, <Anotacao key={novoNumero} numero={novoNumero} />]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar já está no layout.tsx */}
      
      {/* Conteúdo principal com padding para evitar sobreposição */}
      <main className="flex-1 p-4 pt-20 pb-20">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold py-5 text-center">Minhas Anotações</h1>
          <div className="flex justify-center mb-8">
            <MenuOpcoes onClick={handleClick} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anotacoes}
          </div>
        </div>
      </main>
      
      {/* Footer já está no layout.tsx */}
    </div>
  );
}
