import { redirect } from "next/navigation";

export default function SettingsRedirect() {
  redirect("/profile/overview");
}
