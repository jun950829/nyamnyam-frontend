'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/commons/inputs/Input";
import { SignUpFormDataTypes } from "@/constants/types";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  id: yup
    .string()
    .required("Id를 입력해주세요")
    .min(4, "Id는 4글자 이상이에요"),
  displayName: yup
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

  const onSubmit = (data: SignUpFormDataTypes) => {
    setLoading(true);

    // alert(`일단 됐다고 친다`);
    setLoading(false);
    console.log(data);
    router.push("/");

  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto space-y-4">

      <Input label="아이디" {...register("id")} error={errors.id?.message} placeholder="아이디" />
      <Input label="별명" {...register("displayName")} error={errors.displayName?.message} placeholder="닉네임" />
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
