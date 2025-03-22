"use client";

import ProfileHero from "@/components/profile-hero";
import useSession from "@/lib/nostr/useSession";

import { redirect } from "next/navigation";

export default function OverviewPage() {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) redirect("/login");

  return <ProfileHero title="Overview" />;
}
