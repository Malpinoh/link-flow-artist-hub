
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { CreateFanLink } from "@/components/dashboard/CreateFanLink";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();
  const isCreating = location.pathname === "/new";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} />
      <main className="flex-1">
        {isCreating ? (
          <CreateFanLink />
        ) : (
          <Dashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
