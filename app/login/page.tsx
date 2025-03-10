const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        <form className="space-y-4">
          {/* 아이디 입력 박스 */}
          <div>
            <label className="block font-semibold">아이디</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 비밀번호 입력 박스 */}
          <div>
            <label className="block font-semibold">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            로그인
          </button>

          <button
            type="submit"
            className="w-full rounded-md  transition"
          >
            회원가입
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;