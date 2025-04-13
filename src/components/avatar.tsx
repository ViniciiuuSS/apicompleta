"use client";
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";

export function AvatarComponent() {
    
  return (
    <Dropdown label={<Avatar alt="User settings" className="cursor-pointer" rounded />} arrowIcon={false} inline>
      <DropdownHeader>
        <span className="block text-sm">Administrador do Sistema</span>
        <span className="block truncate text-sm font-medium">admin@admin.com</span>
      </DropdownHeader>
      <DropdownItem>Home</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Logout</DropdownItem>
    </Dropdown>
  );
}
