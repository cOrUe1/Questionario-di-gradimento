import { MadeWithDyad } from "@/components/made-with-dyad";
import SurveyCard from "@/components/SurveyCard";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 sm:p-6">
      <Logo />
      <SurveyCard />
      <MadeWithDyad />
    </div>
  );
};

export default Index;