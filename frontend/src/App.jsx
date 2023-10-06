import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import FileContext from "./context/fileContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FolderContext from "./context/FolderContext";
import AiPrompt from "./pages/AiPrompt/AiPrompt";
import PromptContext from "./context/PromptContext";
import MyImages from "./pages/MyImages/MyImages";
import ModalContext from "./context/ModalContext";
import NotFound from "./pages/NotFound/NotFound";
import MyProducts from "./pages/MyProducts/MyProducts";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ModalContext>
                <FileContext>
                  <FolderContext>
                    <Home />
                  </FolderContext>
                </FileContext>
              </ModalContext>
            }
          />
          <Route
            path="/ai-prompt"
            element={
              <PromptContext>
                <AiPrompt />
              </PromptContext>
            }
          />
          <Route path="/myImages" element={<MyImages />} />
          <Route path="/myProducts" element={<MyProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
