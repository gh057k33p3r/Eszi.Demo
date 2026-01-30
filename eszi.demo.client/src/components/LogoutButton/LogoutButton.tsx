import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";

export function LogoutButton() {
  const { mutateAsync: logoutAsync } = useMutation({
    mutationFn: async () => {
      return axiosInstance.post("/auth/logout").then((resp) => resp.data);
    },
  });

  const queryClient = useQueryClient();

  return (
    <input
      type="button"
      value="Kilépés"
      onClick={async () => {
        await logoutAsync();
        queryClient.invalidateQueries();
      }}
    />
  );
}
