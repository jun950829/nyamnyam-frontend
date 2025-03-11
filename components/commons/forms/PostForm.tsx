"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { FoodCateGory } from "@/constants/menus"

// 🔹 Yup을 사용한 유효성 검증 스키마
const matzipSchema = yup.object().shape({
  title: yup.string().min(5, "제목은 최소 5자 이상 입력해야 합니다.").required("제목을 입력하세요."),
  category: yup.string().required("카테고리를 선택하세요."),
  address: yup.string().required("가게 주소를 입력하세요").default(""),
  content: yup.string().min(20, "내용은 최소 20자 이상 입력해야 합니다.").required("내용을 입력하세요."),
  file: yup
    .mixed()
});

const recipeSchema = yup.object().shape({
  title: yup.string().min(5, "제목은 최소 5자 이상 입력해야 합니다.").required("제목을 입력하세요."),
  category: yup.string().required("카테고리를 선택하세요."),
  address: yup.string().default(""),
  content: yup.string().min(20, "내용은 최소 20자 이상 입력해야 합니다.").required("내용을 입력하세요."),
  file: yup
    .mixed()
});

type PostFormData = {
  title: string;
  category: string;
  address: string;
  content: string;
  file?: FileList;
};

interface PostFromProps {
  onSuccess: () => void;
  topic: string;
}

export default function PostForm({ topic, onSuccess }: PostFromProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>(
    topic === "matzip" ?
    {
    resolver: yupResolver(matzipSchema),
  } : {
    resolver: yupResolver(recipeSchema)
  });

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("address", data.address);
    formData.append("content", data.content);
    // formData.append("file", data.file[0]); // 파일 업로드

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("게시글 업로드 실패");

      reset();
      if (onSuccess) onSuccess();
      alert("게시글가 성공적으로 업로드되었습니다!");
    } catch (error) {
      alert("에러 발생: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold">게시글 작성</h2>

      {/* 🔹 제목 입력 */}
      <div>
        <label className="block text-gray-700">제목</label>
        <input
          {...register("title")}
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full p-2 border rounded mt-1"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* 🔹 카테고리 선택 */}
      <div>
        <label className="block text-gray-700">카테고리</label>
        <select
          {...register("category")}
          className="w-full p-2 border rounded mt-1"
          defaultValue=""
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          {FoodCateGory.map((category, index:number) => {
            return (
              <option key={index} value="Tech">{category}</option>
            )
          })
          }
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      {/* 🔹 주소 입력 */}
      {topic === "matzip" &&  
        <div>
          <label className="block text-gray-700">가게 주소</label>
          <input
            {...register("address")}
            type="text"
            placeholder="서울시 강남구 미왕빌딩"
            className="w-full p-2 border rounded mt-1"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
      }

      {/* 🔹 내용 입력 */}
      <div>
        <label className="block text-gray-700">내용</label>
        <textarea
          {...register("content")}
          rows={5}
          placeholder="내용을 입력하세요"
          className="w-full p-2 border rounded mt-1"
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      {/* 🔹 파일 업로드 */}
      <div>
        <label className="block text-gray-700">파일 업로드</label>
        <input
          type="file"
          {...register("file")}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        disabled={isLoading}
      >
        {isLoading ? "업로드 중..." : "게시하기"}
      </button>
    </form>
  );
}
