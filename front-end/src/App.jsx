import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CourseSelection from "./pages/CourseSelection/CourseSelection.pages";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/courses/"
            element={<CourseSelection></CourseSelection>}
          ></Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
