"use client";

import { useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNostrContext } from "@/lib/nostr/NostrContext";

import { Puzzle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { nip19 } from "nostr-tools"

const enum LoginType { nip07, default }

export default function Login() {

  const { setAuthor, addReplay } = useNostrContext();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  /* try entering npub18zx8lw3947pghsgzqv2t0x8pe767sscag5djgj5afr755xkqd97qt530pr */

  // TODO : Unify Login possibilities in one method
  // TODO : setAuthor should be replaced in the future
  
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin();
  }, [setAuthor, router]);

  const handleLogin = useCallback(async (loginType : LoginType = LoginType.default) => {

    switch(loginType)
    {
      case LoginType.nip07: 

        var hex : string = await window.nostr.getPublicKey()    // nip-07 uses public key to enter,
        var npub : string = nip19.npubEncode(hex);              // Should consider using hex keys by default, npubs are encoded twice as needed
        var relays : string[] = Object.keys(await window.nostr.getRelays());
        
        setAuthor && setAuthor(npub || "");                   // Implement Default relays adds
        
        relays.forEach((url) => {
          addReplay && addReplay(url || "");
          console.log(`added relay ${url}`);
        });

        break;

      default:

        let cred : string = inputRef.current?.value || '';
        
        var hexRegex = /^[a-fA-F0-9]+$/i; // hex charset
        var npubRegex = /^npub[0-3][qpzry9x8gf2tvdw0s3jn54khce6mua7l]+/i; // bip-36 charset

        console.log(hexRegex.test(cred));
        console.log()

        // Testing regex, if pubkey classic setAuthor, if hex key, nip19 encode then setAuthor
        npubRegex.test(cred) && setAuthor && setAuthor(inputRef.current?.value || "");
        hexRegex.test(cred) && setAuthor && setAuthor(nip19.npubEncode(inputRef.current?.value || ""));

    }

    router.push("/");

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
            {(typeof(window) !== 'undefined') && window.nostr
              ?
              <div className="mt-6">
                <div className="relative">
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2">Or</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="flex justify-center gap-2 items-center w-full" onClick={() => {handleLogin(LoginType.nip07)}}>
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
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2">Download a nip-07 extension like <a className="underline" href="https://www.getflamingo.org">Flamingo</a></span>
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
