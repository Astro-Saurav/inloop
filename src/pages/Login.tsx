
import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/authentication/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
