import { useAccount } from "../../hooks/useAccount";

export function UserInfo() {
  const { data, isAdmin } = useAccount();

  if (!data) return;

  return (
    <div>
      Üdv. {data.lastName} {data.firstName}{" "}
      {isAdmin ? (
        <span style={{ fontWeight: "bold", color: "green" }}>Admin</span>
      ) : undefined}
    </div>
  );
}
