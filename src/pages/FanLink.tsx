
import { FanLinkPage } from "@/components/fanlink/FanLinkPage";
import { HelmetProvider } from "react-helmet-async";

const FanLinkPageWrapper = () => {
  return (
    <HelmetProvider>
      <FanLinkPage />
    </HelmetProvider>
  );
};

export default FanLinkPageWrapper;
