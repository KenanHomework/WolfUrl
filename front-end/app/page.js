import Welcome from "@/components/welcome";
import NewUrlForm from "@/forms/new-url-form";

export default function Home() {
  return (
    <main className="pt-11 flex flex-col gap-10 w-full h-full">
      <Welcome />
      <NewUrlForm />
    </main>
  );
}
