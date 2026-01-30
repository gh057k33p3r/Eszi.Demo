import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useAccessToken = () => {
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
  });
  return {
    accessToken,
    isLoading,
  };
};
