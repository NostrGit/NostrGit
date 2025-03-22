import { useEffect, useState } from "react";

import { repositories } from "@/data/repositories";

import { usePathname } from "next/navigation";
import { nip19 } from "nostr-tools";

import { useNostrContext } from "./NostrContext";
import { type Metadata } from "./useMetadata";

const useFollowers = (relays: string[] = []) => {
  const pathname = usePathname();
  const { subscribe, defaultRelays } = useNostrContext();
  const [followers, setFollowers] = useState<string[]>([]);

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
          "#p": [data],
          kinds: [3],
        },
      ],
      [...defaultRelays, ...relays],
      (event, isAfterEose, relayURL) => {

        if (!isAfterEose && event.kind === 3) {
          const pubkey = nip19.npubEncode(event.pubkey);
          if(repository?.pubkey !== pubkey) {
            setFollowers(followers => Array.from(new Set([...followers, pubkey])));
          }
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
    followers,
  };
};

export default useFollowers;
