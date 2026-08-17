"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateUserAction } from "@/actions/user.actions";

import {
  userSchema,
  type UserSchema,
} from "@/features/users/validation/user-schema";

import {
  USER_ROLES,
  USER_STATUSES,
} from "@/features/users/constants/user-options";

import type { CmsUser } from "@/services/user.service";

interface Props {
  user: CmsUser;
}

export function UserForm({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formMethods = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: UserSchema) => {
    setLoading(true);

    try {
      await updateUserAction(user.id, data);

      router.push("/users");
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  {...formMethods.register("name")}
                  placeholder="Enter name..."
                />

                {formMethods.formState.errors.name && (
                  <p className="text-sm text-red-600">
                    {formMethods.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  {...formMethods.register("email")}
                  placeholder="Enter email..."
                />

                {formMethods.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {formMethods.formState.errors.email.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Role</Label>

                <Controller
                  control={formMethods.control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        if (value) {
                          field.onChange(value);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>

                      <SelectContent>
                        {USER_ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {formMethods.formState.errors.role && (
                  <p className="text-sm text-red-600">
                    {formMethods.formState.errors.role.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>

                <Controller
                  control={formMethods.control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        if (value) {
                          field.onChange(value);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        {USER_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {formMethods.formState.errors.status && (
                  <p className="text-sm text-red-600">
                    {formMethods.formState.errors.status.message}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/users")}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
