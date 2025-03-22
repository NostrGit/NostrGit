import { useEffect, useState } from "react";

import { useNostrContext } from "./NostrContext";

export type Metadata = {
  banner?: string;
  website?: string;
  nip05?: string;
  picture?: string;
  lud16?: string;
  display_name?: string;
  about?: string;
  name?: string;
};

const useMetadata = (relays: string[] = []) => {
  const { subscribe, defaultRelays, pubkey } = useNostrContext();

  const [metadata, setMetadata] = useState<Metadata>({});
  useEffect(() => {
    if (!subscribe || !pubkey) return;
    const unsub = subscribe(
      [
        {
          kinds: [0],
          authors: [pubkey],
        },
      ],
      [...defaultRelays, ...relays],
      (event, isAfterEose, relayURL) => {

        if (!isAfterEose && event.kind === 0) {
          const data = JSON.parse(event.content) as Metadata;
          setMetadata(data);
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

  return metadata;
};

export default useMetadata;
