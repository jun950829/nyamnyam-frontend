'use client';

import { useRef, useState } from "react";
import Input from "@/components/commons/inputs/Input";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idRef.current?.value || !passwordRef.current?.value) {
      setError("아이디 또는 비밀번호를 입력해주세요");
      return;
    }
    setError("");
    alert(`Login successful! ID: ${idRef.current.value}`);
  };

  const goToSignUp = () => {
    router.push("login/signup")
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <Input ref={idRef} label="아이디" type="text" placeholder="아이디" />
      <Input ref={passwordRef} label="비밀번호" type="password" placeholder="비밀번호" />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        로그인
      </button>
      <button type="button" className="w-full p-2 bg-gray-500 text-white rounded-md hover:bg-blue-600" onClick={goToSignUp}>
        회원가입
      </button>
    </form>
    </>
  );
};

export default LoginForm;
