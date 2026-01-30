import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../axios";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutateAsync: loginAsync } = useMutation({
    mutationFn: () => {
      return axiosInstance
        .post("/auth/login", { email, password })
        .then((resp) => resp.data);
    },
  });

  const queryClient = useQueryClient();

  return (
    <>
      <div>
        <input
          type="text"
          name="email"
          placeholder="E-mail cím"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="button"
          onClick={async () => {
            await loginAsync();
            queryClient.invalidateQueries();
          }}
          value="Belépés"
        />
      </div>
    </>
  );
}
