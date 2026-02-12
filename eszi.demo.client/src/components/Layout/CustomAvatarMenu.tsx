import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../axios";
import { useNavigate } from "react-router";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useAccount } from "../../hooks/useAccount";
import CustomModal from "../CustomModal/CustomModal";

export function CustomAvatarMenu() {
  const navigate = useNavigate();

  const { accessToken } = useAccessToken();

  const { data, isAdmin } = useAccount();

  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);

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
    setLogoutModalOpen(true);
  };

  const handleLogoutModalClose = async (result: boolean) => {
    if (result) {
      await logoutAsync();
      queryClient.invalidateQueries();
    }
    setLogoutModalOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Tooltip
          title={
            !accessToken ? "Anonymous" : `${data?.firstName} ${data?.lastName}`
          }
        >
          <Avatar sx={{ backgroundColor: isAdmin ? "gold" : "#ddd" }}>
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
      <CustomModal
        handleClose={handleLogoutModalClose}
        isOpen={logoutModalOpen}
        label="Kijelentkezés"
      />
    </>
  );
}
