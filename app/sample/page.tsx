import ThemeToggleBtn from "@/components/commons/buttons/ThemeToggleBtn";

export default function Sample() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <h1 className="text-2xl font-bold">Next.js with Tailwind 4 Theme Toggle</h1>
        <ThemeToggleBtn />
      </div>
  );
}