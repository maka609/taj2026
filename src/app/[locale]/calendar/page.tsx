import { getEvents } from "@/actions/calendar";
import CalendarList from "@/components/calendar/CalendarList";

export const metadata = {
  title: "التقويم والأحداث | مدارس تاج النزهة",
};

export default async function CalendarPage() {
  const { data: events } = await getEvents();

  return <CalendarList initialEvents={events as any || []} />;
}
