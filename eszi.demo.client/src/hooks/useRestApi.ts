import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export function useRestApi<T>(url: string) {
  // GET
  const { data: items, refetch: refetchItems } = useQuery({
    queryKey: [url],
    queryFn: () => axiosInstance.get<T[]>(url).then((resp) => resp.data),
  });

  // GETBYID
  const getByIdAsync = (id: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: [url, id],
      queryFn: () => {
        axiosInstance.get<T>(`${url}/${id}`).then((resp) => resp.data);
      },
    });
  };
  // CREATE
  const { mutateAsync: createAsync } = useMutation({
    mutationFn: (itemToCreate: T) =>
      // ... = spread operátor, legtöbbször objektum másolásra használjuk, pl state immutable
      axiosInstance.post(url, { ...itemToCreate }).then((resp) => resp.data),
  });
  // UPDATE
  const { mutateAsync: updateAsync } = useMutation({
    mutationFn: (itemToUpdate: T) =>
      axiosInstance.put(url, { ...itemToUpdate }).then((resp) => resp.data),
  });
  // DELETE
  const { mutateAsync: deleteAsync } = useMutation({
    mutationFn: (id: number) =>
      axiosInstance.delete(`${url}/${id}`).then((resp) => resp.data),
  });

  return {
    items,
    refetchItems,
    getByIdAsync,
    createAsync,
    updateAsync,
    deleteAsync,
  };
}
