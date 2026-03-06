import { Toaster } from "@/components/ui/sonner";
import ElevateAnalytics from "./pages/ElevateAnalytics";

export default function App() {
  return (
    <>
      <ElevateAnalytics />
      <Toaster position="top-right" richColors />
    </>
  );
}
