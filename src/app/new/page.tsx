"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNostrContext } from "@/lib/nostr/NostrContext";
import useSession from "@/lib/nostr/useSession";

import { Album, ChevronDown, Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";

type RepositoryFormInputs = {
  repositoryName: string;
  gitSshBase: string;
  description: string;
  publicRead: string;
};

export default function newRepositoryPage() {
  const { picture, initials, name, isLoggedIn } = useSession();

  if (!isLoggedIn) redirect("/login");

  const { publish } = useNostrContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RepositoryFormInputs>({
    defaultValues: {
      repositoryName: "",
      gitSshBase: "root@localhost",
      description: "",
      publicRead: "public",
    },
  });
  const onSubmit: SubmitHandler<RepositoryFormInputs> = async (data) => {
    const content = JSON.stringify({
      repositoryName: data.repositoryName,
      gitSshBase: data.gitSshBase,
      publicRead: data.publicRead === "public" ? true : false,
      publicWrite: false,
    });
    const repositoryEvent = {
      kind: 51,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: content,
    };
    if (window.nostr) {
      // @ts-expect-error: Argument of type '{ kind: number; created_at: number; tags: never[]; content: string; }' is not assignable to parameter of type 'Event'.
      const signedEvent = await window?.nostr.signEvent(repositoryEvent);
      if (signedEvent !== undefined) {
        publish && publish(signedEvent);
        redirect("/new/published");
      }
    } else {
        console.log("No extension found.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-xl">Create a new repository</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <p>
              A repository contains all project files, including the revision
              history.
            </p>
            <p>
              The docker container git-nostr-bridge should be running on your
              machine.
            </p>
          </div>
          <div className="w-full mt-4 border-bottom border-dotted border-2 border-purple-600"></div>
          <div className="mt-4 flex gap-4 align-middle">
            <div className="hidden items-center md:inline">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex flex-nowrap items-center cursor-pointer">
                    <Button variant="outline" type="button">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={picture} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <span className="ml-1">{name}</span>
                      <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Select owner</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {/* todo: list potential owner entities */}
                    <div className="flex gap-1 cursor-pointer">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={picture} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      {name}
                    </div>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>{" "}
            <p>/</p>{" "}
            <Input
              type="text"
              id="repositoryName"
              placeholder="repository name"
              required
              {...register("repositoryName")}
            />
          </div>
          <p>Great repository names are short and memorable.</p>
          <div className="mt-4">
            <p>
              Description <span className="text-xs">(optional)</span>
            </p>
            <Input type="text" id="description" {...register("description")} />
          </div>
          <div className="w-full mt-4 border-bottom border-dotted border-2 border-purple-600"></div>
          <RadioGroup className="mt-4 gap-4" defaultValue="public">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="public"
                id="public"
                {...register("publicRead")}
              />
              <Label htmlFor="public">
                <div className="flex">
                  <Album />
                  <div className="flex flex-col ml-2">
                    Public{" "}
                    <p className="text-xs mt-1">
                      Anyone on Nostr can see this repository. You choose who
                      can commit.{" "}
                    </p>
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="private"
                id="private"
                {...register("publicRead")}
              />
              <Label htmlFor="private">
                <div className="flex">
                  <Lock />
                  <div className="flex flex-col ml-2">
                    Private{" "}
                    <p className="text-xs mt-1">
                      You choose who can see and commit to this repository.
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
          <div className="w-full mt-4 border-bottom border-dotted border-2 border-purple-600"></div>
          <p className="mt-4">
            You will be asked to sign a nostr event with your private key.
          </p>
          <Button
            variant="success"
            type="submit"
            className="mt-4"
            disabled={Object.keys(errors).length > 0}
          >
            Create repository
          </Button>
        </form>
      </div>
    </>
  );
}
