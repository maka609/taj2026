import { getMessages } from "@/actions/messages";
import MessagesDashboard from "@/components/admin/messages/MessagesDashboard";

export const metadata = {
  title: "الرسائل | Taj El-Nozha Admin",
};

export default async function AdminMessagesPage() {
  const { data } = await getMessages();

  return (
    <div className="w-full">
      <MessagesDashboard initialData={data || []} />
    </div>
  );
}
