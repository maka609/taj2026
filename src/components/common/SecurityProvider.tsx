'use client'

import { useInactivityLogout } from "@/hooks/useInactivityLogout";

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  useInactivityLogout();
  return <>{children}</>;
}
