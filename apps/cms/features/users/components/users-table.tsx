"use client";

import { MoreHorizontal, Pencil, UserCheck, UserX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CmsUser } from "@/services/user.service";

interface Props {
  users: CmsUser[];
}

export function UsersTable({ users }: Props) {
  const router = useRouter();

  if (users.length === 0) {
    return (
      <div className="text-muted-foreground flex min-h-40 items-center justify-center text-sm">
        No users found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Articles</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="font-medium">{user.name}</div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {user.email}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "Active" ? "default" : "secondary"}
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.articleCount}</TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Actions for ${user.name}`}
                    />
                  }
                >
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push(`/users/${user.id}/edit`)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit user
                  </DropdownMenuItem>
                  {user.status === "Active" ? (
                    <DropdownMenuItem>
                      <UserX className="h-4 w-4" />
                      Deactivate
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <UserCheck className="h-4 w-4" />
                      Activate
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
