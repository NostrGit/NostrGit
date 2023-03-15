"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNostrContext } from "@/lib/nostr/NostrContext";

import { Check, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools";

export default function Signup() {
  const { setAuthor } = useNostrContext();
  const [success, setSuccess] = useState<boolean>(false);
  const [skCopied, setSkCopied] = useState<boolean>(false);
  const [pkCopied, setPkCopied] = useState<boolean>(false);
  const [sk, setSk] = useState<string>("");
  const [pk, setPk] = useState<string>("");

  const generateKeys = () => {
    setSuccess(true);
    const sk = generatePrivateKey(); // `sk` is a hex string
    setSk(sk);
    const pk = getPublicKey(sk); // `pk` is a hex string
    const npub = nip19.npubEncode(pk);
    setPk(npub);
    setAuthor && setAuthor(npub);
  };

  const handleCopy = async (type: string, key: string) => {
    if (type === "sk") setSkCopied(true);
    if (type === "pk") setPkCopied(true);
    await navigator.clipboard.writeText(key);
    setTimeout(() => {
      setSkCopied(false);
      setPkCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            width={500}
            height={500}
            className="mx-auto h-12 w-auto"
            src="/logo.svg"
            alt="NostrGit"
          />
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Sign up
          </h1>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#171B21] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="key"
                  className="block text-sm font-medium leading-6"
                >
                  <span>Public key (npub)</span>
                </label>
                <label htmlFor="key" className="text-sm font-medium leading-6">
                  <a
                    href="https://nostr.how/get-started#create-your-account"
                    className="font-bold font-medium text-purple-500"
                  >
                    What are these?
                  </a>
                </label>
              </div>
              <div className="flex mt-2">
                <Input
                  id="pk"
                  name="pk"
                  type="text"
                  value={pk}
                  readOnly
                  className="w-fulls block"
                />
                {!pkCopied ? (
                  <Copy
                    className="ml-2 cursor-pointer"
                    onClick={() => handleCopy("pk", pk)}
                  />
                ) : (
                  <Check className="ml-2" />
                )}
              </div>
              <label
                htmlFor="key"
                className="block mt-2 text-sm font-medium leading-6"
              >
                <span>Private key (hex)</span>
              </label>
              <div className="flex mt-2">
                <Input
                  id="sk"
                  name="sk"
                  type="password"
                  value={sk}
                  readOnly
                  className="w-fulls block"
                />
                {!skCopied ? (
                  <Copy
                    className="ml-2 cursor-pointer"
                    onClick={() => handleCopy("sk", sk)}
                  />
                ) : (
                  <Check className="ml-2" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant={success ? "outline" : "success"}
                type="submit"
                className="flex w-full justify-center"
                onClick={() => generateKeys()}
              >
                {success ? "Generate a different key" : "Generate keys"}
              </Button>
              {success && (
                <Link target="_blank" href="/login">
                  <Button
                    className="w-full mt-4 transition-all"
                    variant="success"
                  >
                    Continue to Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {success && (
        <div className="bg-[#171B21] py-6 px-4 flex flex-col items-center">
          <p className="text-xl">Great! </p>
          <p>
            Now backup your private key safely. It&apos;s recommended to store
            it in a password manager.
          </p>
          <p>
            If you lose your private key,{" "}
            <span className="text-red-400">
              you won&apos;t be able to recover your account
            </span>
            , so keep it safe!
          </p>
        </div>
      )}
    </>
  );
}
