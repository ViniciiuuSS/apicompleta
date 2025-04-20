"use client";

import { TextInput, Button, Label } from "flowbite-react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { HiMail, HiLockClosed } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        setTimeout(() => {
          redirect("/");
        }, 500); // ou até 500ms, só pra testar
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <form onSubmit={handleSubmit} className="mx-auto flex flex-row gap-1 h-full w-full">
          <div className="flex flex-col items-center justify-center w-full border-r border-gray-200 dark:border-gray-600">
            <div className="relative">
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" icon={HiMail} placeholder="username@email.com" required />
            </div>
            <div className="relative py-5">
              <div className="mb-2 block">
                <Label htmlFor="password">Senha</Label>
              </div>
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" icon={HiLockClosed} placeholder="********" required />
            </div>
            <Button type="submit" className="cursor-pointer">
              Login
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
