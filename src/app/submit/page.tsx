import SubmitForm from "@/components/SubmitForm";

export default function SubmitPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-2">Submit Your Data</h1>
      <SubmitForm />
    </div>
  );
}
