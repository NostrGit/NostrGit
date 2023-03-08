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
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a href="/signup" className="font-medium text-purple-500">
              sign up
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#171B21] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="key"
                  className="block text-sm font-medium leading-6"
                >
                  <span className="line-through">nsec</span>, npub,{" "}
                  <span className="line-through">nip-05 or hex</span>
                </label>
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
                  <span className="px-2">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div></div>
                <div>
                  <Button className="w-full">
                    <span className="sr-only">Sign in with Alby</span>
                    <Image
                      className="grayscale"
                      width={36}
                      height={36}
                      src="/logo-alby.svg"
                      alt="Alby"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
