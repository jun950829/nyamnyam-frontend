'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/commons/inputs/Input";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  id: yup
    .string()
    .required("Id를 입력해주세요"),
  password: yup.string().required("Password를 입력해주세요")
});

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

    const onSubmit = (data: {id:string, password: string}) => {
      setLoading(true);
  
      // alert(`일단 됐다고 친다`);
      setLoading(false);
      console.log(data);
      router.push("/");
  
    };

  const goToSignUp = () => {
    router.push("login/signup")
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto space-y-4">
      <Input label="아이디" {...register("id")} error={errors.id?.message} placeholder="아이디" />
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
