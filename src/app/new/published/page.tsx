"use client";

import useSession from "@/lib/nostr/useSession";

import { redirect } from "next/navigation";

export default function PublishedPage() {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) redirect("/login");

  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-xl">Repository published</h1>
        <div className="mt-4">
          <p>
            Publish your ssh key to the nostr relays configured in{" "}
            <span className="text-purple-600">
              ~/.config/git-nostr/git-nostr-cli.json
            </span>
            :
          </p>
          <div className="mt-4 p-4 rounded-lg bg-slate-900">
            <p className="text-green-600">
              # Replace id_rsa.pub with the public key file you want to use
            </p>
            <p>{`./bin/gn ssh-key add ~/.ssh/id_rsa.pub`}</p>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-slate-900">
            <p className="text-green-600">
              # Give yourself write permission to your repository
            </p>
            <p>{`./bin/gn repo permission test <publickey> WRITE`}</p>
          </div>
          <p className="mt-4">You can use the NIP-05 identifier as well:</p>
          <div className="mt-4 p-4 rounded-lg bg-slate-900">
            <p className="text-green-600">
              # Public key should be in hex format
            </p>
            <p>{`./bin/gn repo permission username@relayaddr WRITE`}</p>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-slate-900">
            <p className="text-green-600"># Clone the repository</p>
            <p className="text-green-600">
              # Public key should be in hex format
            </p>
            <p>{`./bin/gn repo clone <publickey>:<repositoryName>`}</p>
          </div>
          <div className="mt-4">
            <p>
              Having problems? You can read the NostrGit documentation{" "}
              <a
                className="text-purple-600"
                href="https://github.com/NostrGit/NostrGit"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
