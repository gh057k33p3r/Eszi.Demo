import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";

export function Admin() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: () =>
      axiosInstance.get<string>("/admin").then((resp) => resp.data),
  });

  return <>{!isLoading ? data : "Betöltés..."}</>;
}
