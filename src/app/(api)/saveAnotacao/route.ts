import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), "data", "data.json");

// Função para garantir que o arquivo existe
async function ensureFileExists() {
  try {
    await fs.access(filePath);
  } catch {
    // Se o arquivo não existir, crie-o com um array vazio
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
  }
}

export async function GET() {
  await ensureFileExists();
  const data = await fs.readFile(filePath, 'utf8');
  return new Response(data);
}

export async function POST(request: Request) {
  await ensureFileExists();
  
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const dataArray = JSON.parse(fileContent);
    const data = await request.json();
    
    const newAnotacao = {
      ...data,
      id: data.numero,
      createdAt: new Date().toISOString()
    };
    
    dataArray.push(newAnotacao);
    await fs.writeFile(filePath, JSON.stringify(dataArray, null, 2));
    
    return new Response(JSON.stringify({ success: true, anotacao: newAnotacao }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao salvar anotação:', error);
    return new Response(JSON.stringify({ success: false, error: 'Erro ao salvar anotação' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

