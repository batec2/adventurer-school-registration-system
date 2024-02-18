import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "./AxiosRequests";

export const useStudentGet = () => {
  const results = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });
  return [results?.data ?? [], results.status];
};
