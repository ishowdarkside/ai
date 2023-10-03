import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FolderContext from "./context/FolderContext";
import AiPrompt from "./pages/AiPrompt/AiPrompt";
import PromptContext from "./context/PromptContext";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <FolderContext>
                <Home />
              </FolderContext>
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
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
