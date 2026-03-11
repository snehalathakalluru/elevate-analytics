import { Toaster } from "@/components/ui/sonner";
import PixelView from "./pages/PixelView";

export default function App() {
  return (
    <>
      <PixelView />
      <Toaster position="top-center" theme="dark" />
    </>
  );
}
