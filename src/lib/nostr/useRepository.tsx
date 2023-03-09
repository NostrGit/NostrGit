import { useEffect, useState } from "react";

import { repositories } from "@/data/repositories";

import { usePathname } from "next/navigation";
import { nip19 } from "nostr-tools";

import { useNostrContext } from "./NostrContext";
import { type Metadata } from "./useMetadata";

const useRepository = (relays: string[] = []) => {
  const pathname = usePathname();
  const { subscribe, defaultRelays } = useNostrContext();
  const [repoMetadata, setRepoMetadata] = useState<Metadata>({});

  const repository = repositories.find(
    (repo) => pathname && pathname.includes(repo.slug)
  );
  const pubkey = repository?.pubkey;

  useEffect(() => {
    if (!subscribe || !pubkey) return;

    const { type, data } = (
      nip19 as unknown as {
        decode: (pubkey: string) => { type: string; data: string };
      }
    ).decode(pubkey);

    if (type !== "npub") return;

    const unsub = subscribe(
      [
        {
          kinds: [0],
          authors: [data],
        },
      ],
      [...defaultRelays, ...relays],
      (event, isAfterEose, relayURL) => {

        if (!isAfterEose && event.kind === 0) {
          const data = JSON.parse(event.content) as Metadata;
          setRepoMetadata(data);
        }
      },
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (events, relayURL) => {}
    );
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pubkey]);
  return {
    metadata: repoMetadata,
    repoInfo: repository || null,
  };
};

export default useRepository;
