import { useState } from "react";
import StudentIdContext from "./context/StudentIdContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CourseSelection from "./pages/CourseSelection/CourseSelection.pages";
import "./App.css";
import CourseInfo from "./pages/CourseInfo/CourseInfo.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  const studentId = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StudentIdContext.Provider value={studentId}>
          <Routes>
            <Route path="/" element={<CourseSelection />}></Route>
            {/* <Route path="/courses/" element={<CourseSelection />}></Route> */}
            <Route
              path="/info/:courseId/:studentId"
              element={<CourseInfo />}
            ></Route>
          </Routes>
          <ToastContainer></ToastContainer>
        </StudentIdContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
