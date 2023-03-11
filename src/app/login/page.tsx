"use client";

import { useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNostrContext } from "@/lib/nostr/NostrContext";
import { LoginType, checkType } from "@/lib/utils";

import { Puzzle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { nip19, nip05 } from "nostr-tools"


export default function Login() {

  const { setAuthor } = useNostrContext();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  // TODO : setAuthor needs to be tweaked (don't remove but tweak *_*)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    await handleLogin();
    console.log("HandleSubmit");

  };

  const handleLogin = useCallback(async () => {

    const cred = inputRef.current?.value || '';
    let loginType = checkType(cred);
    let npub = '';

    console.log("Yay!")

    // Checking for nip07 extension
    loginType = (window.nostr && cred === '') ? LoginType.nip07 : loginType; 
    
    // Else use common npub credentials
    switch(loginType)
    {
      case LoginType.npub:
        npub = cred; 
        break;
      case LoginType.hex: 
        npub = nip19.npubEncode(cred);
        break;
      case LoginType.nip07:
        const hex = await window.nostr.getPublicKey()
        console.log(hex);
        npub = nip19.npubEncode(hex);
        break;
      case LoginType.nip05:
        const profile = await nip05.queryProfile(cred)
        npub = nip19.npubEncode(profile?.pubkey || '')
      default: break;
    }
    // Set Author and return to root
    setAuthor && setAuthor(npub)
    router.push('/')

  }, [setAuthor, router]);

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
                    type="text"
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
            {(typeof (window) !== 'undefined' && typeof (window.nostr) !== 'undefined')
              ?
              <div className="mt-6">
                <div className="relative">
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2">Or</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="flex justify-center gap-2 items-center w-full" onClick={handleLogin}>
                    <Puzzle />
                    <p className="text-center">Continue with extension</p>
                  </Button>
                </div>
              </div>
              :
              <div className="mt-6">
                <div className="relative">
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2">Or</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <div className="relative flex justify-center text-center text-sm">
                      <span className="px-2">
                        <span className="mr-1">For better security, download a NIP-07 extension like</span>
                        <a className="underline" href="https://www.getflamingo.org">Flamingo</a>
                        <span className="ml-1 mr-1">or</span>
                        <a className="underline" href="https://addons.mozilla.org/en-US/firefox/addon/nos2x-fox/">nos2x-fox</a>.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            }

          </div>
          <div className="flex justify-center center mt-1">
            <p>
              Don&apos;t have a
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
