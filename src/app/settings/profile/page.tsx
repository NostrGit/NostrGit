"use client";

import SettingsHero from "@/components/settings-hero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useMetadata from "@/lib/nostr/useMetadata";
import useSession from "@/lib/nostr/useSession";

// TODO: can we fetch metadata and session from server? I rather not want this as a "use client" component

export default function ProfilePage() {
  const metadata = useMetadata();
  const { picture, name } = useSession();

  return (
    <>
      <SettingsHero title="Profile" />
      <div className="lg:flex lg:space-x-8">
        <div className="space-y-4 max-w-md w-full mb-4">
          <div className="space-y-1">
            <Label htmlFor="display-name">Display Name</Label>
            <Input
              type="text"
              id="display-name"
              placeholder="John Doe"
              value={metadata.display_name}
            />
            <p className="text-sm text-slate-500">
              Your display will be shown on all Nostr clients, and on NostrGit.
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="John Doe"
              value={"@" + name}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="nip5">NIP-5</Label>
            <Input
              type="text"
              id="nip5"
              placeholder="satoshi@nakamoto.com"
              value={metadata.nip05}
            />
            <p className="text-sm text-slate-500">
              To learn more about NIP5 and how to get verified, visit{" "}
              <a
                className="text-purple-500 underline"
                href="https://nostr.how/verify-your-identity"
              >
                nostr.how
              </a>
              .
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="nip5">Description</Label>
            <Textarea
              rows={5}
              id="nip5"
              placeholder="nostrgit maintainer. bitcoiner. pura vida"
              value={metadata.about}
            />
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element*/}
        </div>
        <div>
          <Label htmlFor="profile-picture">Profile Picture</Label>
          <img
            src={picture}
            alt={name}
            className="my-4 rounded-full w-52 h-52"
          />
        </div>
      </div>
    </>
  );
}
