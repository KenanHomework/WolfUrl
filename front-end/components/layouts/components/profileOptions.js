"use client";
import { logOutScenario, useAuthData } from "@/utils/auth";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";

export default function ProfileOptions() {
  const { username, email } = useAuthData();
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
          }}
          className="transition-transform"
          description={email}
          name={username}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@{username}</p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={async () => {
            await logOutScenario();
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
