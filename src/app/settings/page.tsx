"use client";

import useSession from "@/lib/nostr/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeftRight, Brush, Cast, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function GlobalSettingsPage({ }) {

    const { picture, name, initials, isLoggedIn } = useSession();

    return (
        <div>
            <div className="flex mt-8 ml-8">
                <div className="flex w-full">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={picture} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ml-2">
                        <p className="text-lg">{name}</p>
                        <p>Your personal account</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center cursor-pointer items-end mt-8 ml-2">
                                <ArrowLeftRight />
                                <p className="cursor-pointer ml-1 text-purple-400">Switch to another account</p>
                                <ChevronDown className="mt-1 h-4 w-4 hover:text-white/80" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            { /* todo: fetch organisations and map them here */}
                            <p className="cursor-pointer">organisation 1</p>
                            <DropdownMenuSeparator />
                            <p className="cursor-pointer">organisation 2</p>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Link href={`/${name}`}>
                    <Button
                        variant={"outline"}
                        type="submit"
                        onClick={() => 0}
                        className="mr-2 text-xs"
                    >
                        Go to your personal profile
                    </Button>
                </Link>
            </div>
            <div className="flex mt-8 ml-2">
                <div className="flex flex-col gap-3 w-1/3">
                    <div className="flex">
                        <User />
                        <p className="ml-2">Public profile</p>
                    </div>
                    <div className="flex">
                        <Brush />
                        <p className="ml-2">Appearance</p>
                    </div>
                    <div className="flex">
                        <Cast />
                        <p className="ml-2">Relays</p>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="border-b-2">
                        <p className="text-xl mb-2">Public profile</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                        <p>Name</p>
                        <Input
                            className="w-auto"
                            type="text"
                            placeholder={name}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};