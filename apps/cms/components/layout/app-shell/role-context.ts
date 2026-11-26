"use client";

import { createContext } from "react";
import type { UserRole } from "@/lib/auth-guard";

export const RoleContext = createContext<UserRole | null>(null);
