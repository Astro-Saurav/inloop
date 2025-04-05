
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { SJSQuestionsList } from "@/components/forums/SJSQuestionsList";
import { useAuth } from "@/context/AuthContext";

const SeniorJunior = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <Navbar />
      <main className="flex-1">
        <SJSQuestionsList />
      </main>
    </div>
  );
};

export default SeniorJunior;
