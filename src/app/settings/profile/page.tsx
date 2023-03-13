"use client";

import SettingsHero from "@/components/settings-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useMetadata from "@/lib/nostr/useMetadata";
import useSession from "@/lib/nostr/useSession";

import { type SubmitHandler, useForm } from "react-hook-form";

type ProfileFormInputs = {
  displayName: string;
  userName: string;
  nip5: string;
  description: string;
};

// TODO: can we fetch metadata and session from server? I rather not want this as a "use client" component

export default function ProfilePage() {
  const metadata = useMetadata();
  const { picture, name } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      displayName: metadata.display_name || "",
      userName: name || "",
      nip5: metadata.nip05 || "",
      description: metadata.about || "",
    },
  });
  const onSubmit: SubmitHandler<ProfileFormInputs> = (data) =>
    console.log(data);

  return (
    <>
      <SettingsHero title="Profile" />
      <div className="lg:flex lg:space-x-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 max-w-md w-full mb-4">
            <div className="space-y-1">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                type="text"
                id="display-name"
                placeholder="John Doe"
                {...register("displayName")}
              />
              <p className="text-sm text-zinc-500">
                Your display will be shown on all Nostr clients, and on
                NostrGit.
              </p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="John Doe"
                {...register("userName")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nip5">NIP-5</Label>
              <Input
                type="text"
                id="nip5"
                placeholder="satoshi@nakamoto.com"
                {...register("nip5")}
              />
              <p className="text-sm text-zinc-500">
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
                {...register("description")}
              />
            </div>

            <Button
              variant="outline"
              type="submit"
              className=""
              disabled={Object.keys(errors).length > 0}
            >
              Update profile
            </Button>
          </div>
        </form>
        <div>
          <Label htmlFor="profile-picture">Profile Picture</Label>
          {/* eslint-disable-next-line @next/next/no-img-element*/}
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
