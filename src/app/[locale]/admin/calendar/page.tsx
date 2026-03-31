import { getEvents } from "@/actions/calendar";
import CalendarDashboard from "@/components/admin/calendar/CalendarDashboard";

export const metadata = {
  title: "التقويم والأحداث | Taj El-Nozha Admin",
};

export default async function AdminCalendarPage() {
  const { data } = await getEvents();

  return (
    <div className="w-full">
      <CalendarDashboard initialData={data || []} />
    </div>
  );
}
