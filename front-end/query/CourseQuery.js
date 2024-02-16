import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCourseGet = () => {
  return useQuery({
    queryKey: ["get"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/courses/");
      return data;
    },
  });
};
