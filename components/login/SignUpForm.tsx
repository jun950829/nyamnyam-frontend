'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/commons/inputs/Input";
import { SignUpFormDataTypes } from "@/constants/types";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  member_real_id : yup
    .string()
    .required("Id를 입력해주세요")
    .min(4, "Id는 4글자 이상이에요"),
  nickname : yup
    .string()
    .required("Id를 입력해주세요")
    .min(3, "닉네임은 3글자 이상이에요"),
  email: yup.string().required("Email을 입력해주세요").email("이메일 형식이 아닙니다"),
  password: yup.string().required("Password를 입력해주세요").min(6, "6글자 이상으로 해주세요"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")],"Password가 일치하지 않아요")
    .required("Password를 확인해주세요"),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormDataTypes) => {
    setLoading(true);
    const postData = {
      ...data,
      role: "general"
    }

    const response = await fetch('http://localhost:8080/api/member', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    // {result_code: '202', result_message: '이미 존재하는 유저 ID입니다.'}
    if(result.result_code === "202") {
      alert(result.result_message)
      setLoading(false);
    } else {
      alert(result.result_message);
      setLoading(false);
      router.push("/login");
    }
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto space-y-4">

      <Input label="아이디" {...register("member_real_id")} error={errors.member_real_id?.message} placeholder="아이디" />
      <Input label="별명" {...register("nickname")} error={errors.nickname?.message} placeholder="닉네임" />
      <Input label="Email" type="email" {...register("email")} error={errors.email?.message} placeholder="Email" />
      <Input label="비밀번호" type="password" {...register("password")} error={errors.password?.message} placeholder="비밀번호" />
      <Input
        label="비밀번호 확인"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        placeholder="비밀번호 확인"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={loading}>
        {loading ? "회원 가입 중..." : "회원 가입"}
      </button>
    </form>
  );
}
export default SignUpForm;
