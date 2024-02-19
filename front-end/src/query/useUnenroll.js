import { useMutation } from "@tanstack/react-query";
import { unenrollToClass } from "./AxiosRequests";
import { useQueryClient } from "@tanstack/react-query";

const useUnenroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unenrollToClass,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export default useUnenroll;
