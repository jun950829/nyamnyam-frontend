'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/commons/inputs/Input";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import useLoginStore from "@/stores/useLoginStore";

const schema = yup.object().shape({
  member_real_id: yup
    .string()
    .required("Id를 입력해주세요"),
  password: yup.string().required("Password를 입력해주세요")
});

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setUser = useLoginStore((state) => state.setUser);
  const setAdmin = useLoginStore((state) => state.setAdmin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

    const onSubmit = async (data: {member_real_id:string, password: string}) => {
      setLoading(true);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/member/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      
    // {result_code: '202', result_message: '이미 존재하는 유저 ID입니다.'}
    if(result.result_code === "202") {
      alert(result.result_message)
      setLoading(false);
    } else {
      setUser({
        id: result.data.id,
        nickname: result.data.nickname,
        role: result.data.role,
        member_real_id: result.data.member_real_id
      })

      if (result.data.role === "admin") {
        setAdmin()
      }

      setLoading(false);
      router.push("/");
    }
  
    };

  const goToSignUp = () => {
    router.push("login/signup")
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto space-y-4">
      <Input label="아이디" {...register("member_real_id")} error={errors.member_real_id?.message} placeholder="아이디" />
      <Input label="비밀번호" type="password" {...register("password")} error={errors.password?.message} placeholder="비밀번호" />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </button>

      <button type="button" className="w-full p-2 bg-gray-500 text-white rounded-md hover:bg-blue-600" onClick={goToSignUp}>
        회원가입
      </button>
    </form>
    </>
  );
};

export default LoginForm;
