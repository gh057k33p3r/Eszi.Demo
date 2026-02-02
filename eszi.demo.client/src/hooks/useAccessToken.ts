import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useAccessToken = (enabled: boolean = true) => {
  const { data: accessToken, isLoading } = useQuery({
    queryKey: ["cookietoken"],
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get<string>("/auth/cookietoken");
        return resp.data;
      } catch {
        return null;
      }
    },
    enabled,
  });
  return {
    accessToken,
    isLoading,
  };
};
