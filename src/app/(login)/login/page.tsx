"use client";

import { TextInput, Button, Label } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiMail, HiLockClosed } from "react-icons/hi";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/loger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.error === 0) {
        console.log("Login bem-sucedido, redirecionando...");
        // Força um pequeno delay para garantir que o cookie seja processado
        await new Promise((resolve) => setTimeout(resolve, 100));
        router.replace("/");
      } else {
        setError("Falha no login. Verifique suas credenciais.");
        console.log("Login failed:", data);
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      setError("Ocorreu um erro durante o login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <form onSubmit={handleSubmit} className="mx-auto flex flex-row gap-1 h-full w-full">
          <div className="flex flex-col items-center justify-center w-full border-r border-gray-200 dark:border-gray-600">
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
            <div className="relative">
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" icon={HiMail} placeholder="username@email.com" required disabled={isLoading} />
            </div>
            <div className="relative py-5">
              <div className="mb-2 block">
                <Label htmlFor="password">Senha</Label>
              </div>
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" icon={HiLockClosed} placeholder="********" required disabled={isLoading} />
            </div>
            <Button type="submit" className="cursor-pointer" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Login"}
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-md:hidden">
            <iframe src="https://lottie.host/embed/48a4f71a-f17e-42ba-850b-49c9b8153c17/XznlfCQmoo.lottie" width="50%" height="100%" className="rounded-lg "></iframe>
          </div>
        </form>
      </div>
    </div>
  );
}
