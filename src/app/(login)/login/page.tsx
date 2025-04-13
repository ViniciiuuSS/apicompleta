"use client";

import { TextInput, Button, Label } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiMail, HiLockClosed } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/loger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error === 0) {
        router.push("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col gap-1">
          <div className="relative">
            <div className="mb-2 block">
              <Label htmlFor="email">Email</Label>
            </div>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" icon={HiMail} placeholder="email@email.com" required />
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
        </form>
      </div>
    </div>
  );
}
