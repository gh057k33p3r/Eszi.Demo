import { useFormik } from "formik";
import type { LoginRequest } from "../../types";
import { Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiFunctions } from "../../hooks/useApiFunctions/useApiFunctions";

export function CustomLoginForm() {
  const { login } = useApiFunctions();

  const initialValues: LoginRequest = { Email: "", Password: "" };

  const formik = useFormik<LoginRequest>({
    onSubmit: async (values: LoginRequest) => {
      await loginAsync(values);
      queryClient.invalidateQueries();
      formik.resetForm();
    },
    initialValues,
  });

  const { handleSubmit, values, handleChange } = formik;

  const { mutateAsync: loginAsync } = useMutation({
    mutationFn: login,
  });

  const queryClient = useQueryClient();

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextField
          name={"Email"}
          value={values.Email}
          fullWidth
          label="E-mail"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name={"Password"}
          value={values.Password}
          fullWidth
          label="Password"
          variant="outlined"
          onChange={handleChange}
        />
        <Button fullWidth type="submit" variant="contained">
          Bejelentkezés
        </Button>
      </div>
    </form>
  );
}
