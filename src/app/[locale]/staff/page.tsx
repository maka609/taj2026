import { getStaff } from "@/actions/staff";
import StaffList from "@/components/staff/StaffList";

export const metadata = {
  title: "الكادر التعليمي | مدارس تاج النزهة",
};

export default async function StaffPage() {
  const { data: staff } = await getStaff();

  return <StaffList staff={staff as any || []} />;
}
