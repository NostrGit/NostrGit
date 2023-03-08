"use client";

import { useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNostrContext } from "@/lib/nostr/NostrContext";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const { setAuthor } = useNostrContext();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  /* try entering npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr */

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setAuthor && setAuthor(inputRef.current?.value || "");
      router.push("/");
    },
    [setAuthor, router]
  );

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            width={500}
            height={500}
            className="mx-auto h-12 w-auto"
            src="/logo.svg"
            alt="NostrGit"
          />
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Sign in
          </h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#171B21] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="key"
                    className="block text-sm font-medium leading-6"
                  >
                    <span className="line-through">nsec</span>, npub,{" "}
                    <span className="line-through">nip-05 or hex</span>
                  </label>
                  <label
                    htmlFor="key"
                    className="text-sm font-medium leading-6"
                  >
                    <a
                      href="https://nostr.how/get-started"
                      className="font-bold font-medium text-purple-500"
                    >
                      What are these?
                    </a>
                  </label>
                </div>
                <div className="mt-2">
                  <Input
                    id="key"
                    name="key"
                    type="password"
                    required
                    className="w-fulls block"
                    ref={inputRef}
                  />
                </div>
              </div>

              <div>
                <Button
                  variant={"success"}
                  type="submit"
                  className="flex w-full justify-center"
                >
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-2">Or</span>
                </div>
              </div>

              <div className="mt-6">
                <Button className="flex justify-center gap-2 items-center w-full">
                  <Image
                    className="grayscale self-start"
                    width={28}
                    height={28}
                    src="/extension.svg"
                    alt="Alby"
                  />
                  <p className="text-center">Continue with extension</p>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center center mt-1">
            <p>
              Don't have a
              <a href="https://nostr.how/">
                <b className="font-medium text-purple-500 ml-1 mr-1">Nostr</b>
              </a>
              profile?
            </p>
            <a href="/signup" className="font-medium text-purple-500 ml-1">
              Create one here.
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
