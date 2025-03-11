import LoginForm from "../../components/login/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;