import SignUpForm from "@/components/login/SignUpForm";

export const SingUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md w-100">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        <SignUpForm/>
      </div>
    </div>
  );
};

export default SingUp;