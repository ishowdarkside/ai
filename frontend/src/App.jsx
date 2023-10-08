import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import FileContext from "./context/fileContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FolderContext from "./context/FolderContext";
import ModalContext from "./context/ModalContext";
import NotFound from "./pages/NotFound/NotFound";
import MyProducts from "./pages/MyProducts/MyProducts";
import GeneratorContext from "./context/GeneratorContext";
import AiPromptContext from "./context/AiPromptContext";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AiPromptContext>
                <GeneratorContext>
                  <ModalContext>
                    <FileContext>
                      <FolderContext>
                        <Home />
                      </FolderContext>
                    </FileContext>
                  </ModalContext>
                </GeneratorContext>
              </AiPromptContext>
            }
          />
          <Route
            path="/myProducts"
            element={
              <ModalContext>
                <MyProducts />
              </ModalContext>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
