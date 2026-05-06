import { redirect } from "next/navigation";

export default function Page() {
  if (typeof window !== "undefined") {
    const lastPage = localStorage.getItem("lastPage") || "1";
    redirect(`/quran/${lastPage}`);
  }

  redirect("/quran/1");
}