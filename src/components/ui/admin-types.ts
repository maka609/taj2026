/**
 * Common prop types for Admin Dashboard components
 */
export interface AdminDashboardProps<T> {
  initialData: T[];
}

/**
 * Common prop types for Admin Forms
 */
export interface AdminFormProps<T> {
  initialData?: T | null;
  onSuccess: () => void;
}

/**
 * Standard Status Type for various modules
 */
export type Status = "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED" | "PUBLISHED" | "DRAFT" | "ACTIVE" | "INACTIVE";

/**
 * Base data structure for items in the admin panel
 */
export interface BaseAdminItem {
    id: string;
    createdAt: Date | string;
    updatedAt?: Date | string;
}
