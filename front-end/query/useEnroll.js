import { useMutation } from "@tanstack/react-query";
import { enrollToClass } from "./AxiosRequests";
import { useQueryClient } from "@tanstack/react-query";

const useEnroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollToClass,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

export default useEnroll;
