import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState<string>("admin");
  const [password, setPassword] = useState<string>("password");

  const loginAsync = async () => {};

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
          }}
          value="Belépés"
        />
      </div>
    </>
  );
}
