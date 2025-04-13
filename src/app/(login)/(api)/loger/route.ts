import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log("Email recebido:", email);
  console.log("Senha recebida:", password);

  if (email != "teste@email.com" && password != "123456") {
    const cookieStore = await cookies();
    cookieStore.set("token", "123456", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return new Response(JSON.stringify({ error: 0, message: "Login bem-sucedido" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ error: 1, message: "Credenciais inválidas" }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
