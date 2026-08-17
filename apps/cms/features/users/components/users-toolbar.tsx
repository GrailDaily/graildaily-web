"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { USER_ROLES, USER_STATUSES } from "../constants/user-options";

interface Props {
  search: string;
  role: string;
  status: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function UsersToolbar({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search users..."
          className="pl-9"
        />
      </div>

      <Select
        value={role}
        onValueChange={(value) => onRoleChange(value ?? "all")}
      >
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>

          {USER_ROLES.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value ?? "all")}
      >
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>

          {USER_STATUSES.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
