import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../components/Loading";
import LoginBox from "../components/LoginBox";
import { stringToBase64 } from "../utils/convert";
import { UserData } from "../utils/types";

export default function LoginPage() {
  const router = useRouter();
  const [ isLoading, showLoading ] = useState(false);

  function handleSignIn(data: UserData) {
    showLoading(true);

    signIn(data).then(
      () => {
        router.push('/dashboard');
      }
    ).catch(
      (e) => {
        console.error("error:", e);
        showLoading(false);  
      }
    );
  }

  return (
    <main className="children-center" style={{ background: "var(--color-secondary)"}}>
      <LoginBox signIn={handleSignIn}/>

      {isLoading && <Loading />}
    </main>
  );
}

async function signIn(data: UserData) {
    const { username, password } = data;

    const authorization = `Basic ${stringToBase64(`${username}:${password}`)}`;
    const res = await fetch("/api/login", {
      headers: {
        authorization
      }
    });

    if(res.ok) {
      const token = await getToken(res);
      sessionStorage.setItem("token", token);
      return;
    }

    throw Error(res.status === 401 ? "Nome de usuário ou senha invalida" : "Error na comunicação com o servidor");
}

async function getToken(res: Response) {
  const token = (await res.json())['token'];

  if(typeof token !== "string" || token.length !== 32) {
    throw Error('Token invalid');
  }

  return token;
}