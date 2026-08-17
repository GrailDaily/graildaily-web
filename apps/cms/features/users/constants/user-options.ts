export const USER_ROLES = ["Admin", "Editor", "Author"] as const;

export const USER_STATUSES = ["Active", "Inactive"] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
