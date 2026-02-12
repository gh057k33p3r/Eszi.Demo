import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../axios";
import { useNavigate } from "react-router";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useAccount } from "../../hooks/useAccount";

export function CustomAvatarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutateAsync: logoutAsync } = useMutation({
    mutationFn: async () => {
      return axiosInstance.post("/auth/logout").then((resp) => resp.data);
    },
  });

  const queryClient = useQueryClient();

  const handleLogoutClick = async () => {
    await logoutAsync();
    queryClient.invalidateQueries();
    handleClose();
  };

  const navigate = useNavigate();

  const { accessToken } = useAccessToken();

  const { data } = useAccount();

  return (
    <>
      <IconButton onClick={handleClick}>
        <Tooltip
          title={
            !accessToken ? "Anonymous" : `${data?.firstName} ${data?.lastName}`
          }
        >
          <Avatar>
            {accessToken ? `${data?.firstName[0]}${data?.lastName[0]}` : "A"}
          </Avatar>
        </Tooltip>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {!accessToken ? (
          <MenuItem onClick={() => navigate("/login")}>Bejelentkezés</MenuItem>
        ) : (
          <MenuItem onClick={handleLogoutClick}>Kijelentkezés</MenuItem>
        )}
      </Menu>
    </>
  );
}
