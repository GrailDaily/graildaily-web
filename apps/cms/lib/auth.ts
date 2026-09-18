import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user: {
    additionalFields: {
      role: {
        type: ["Admin", "Editor", "Author"],
        required: true,
        defaultValue: "Author",
        input: false,
      },
      status: {
        type: ["Active", "Inactive"],
        required: true,
        defaultValue: "Active",
        input: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
