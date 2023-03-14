import { type ReactNode, createContext, useCallback, useContext } from "react";

import {
  type OnEose,
  type OnEvent,
  RelayPool,
  type SubscriptionOptions,
} from "nostr-relaypool";
import { type Filter } from "nostr-tools";
import { nip19 } from "nostr-tools";

import useLocalStorage from "../hooks/useLocalStorage";

import { WEB_STORAGE_KEYS } from "./localStorage";

declare global {
  interface Window {
    nostr: {
      getPublicKey(): Promise<string>,
      signEvent(event: Event): Promise<Event>,
      getRelays(): Promise<{ [url: string]: { read: boolean, write: boolean } }>,
      nip04: {
        encrypt(pubkey: string, plaintext: string): Promise<string>,
        decrypt(pubkey: string, ciphertext: string): Promise<string>
      }
    };
  }
}

const defaultRelays = [
  "wss://relay.damus.io",
  "wss://nostr.fmt.wiz.biz",
  "wss://nostr.bongbong.com",
  "wss://nos.lol",
];
const relays = localStorage.getItem("relays");
if (relays === null) localStorage.setItem("relays", JSON.stringify(defaultRelays));
const relayPool = relays
  ? new RelayPool(JSON.parse(relays as string))
  : new RelayPool(defaultRelays);

const NostrContext = createContext<{
  subscribe?: typeof relayPool.subscribe;
  addRelay?: (url: string) => void;
  removeRelay?: (url: string) => void;
  defaultRelays: string[];
  setAuthor?: (author: string) => void;
  pubkey: string | null;
  signOut?: () => void;
}>({ defaultRelays, pubkey: null });

export const useNostrContext = () => {
  const context = useContext(NostrContext);
  if (context === null) {
    throw new Error("useNostrContext must be used within NostrProvider");
  }
  return context;
};

const NostrProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const addRelay = useCallback(async (url: string) => {
    const relays = await JSON.parse(localStorage.getItem("relays") || "[]");
    relays.push(url);
    localStorage.setItem("relays", JSON.stringify(relays));
    relayPool.addOrGetRelay(url);
  }, []);

  const relayPoolSubscribe = useCallback(
    (
      filters: (Filter & { relay?: string; noCache?: boolean })[],
      relays: string[],
      onEvent: OnEvent,
      maxDelayms?: number,
      onEose?: OnEose,
      options: SubscriptionOptions = {}
    ) => {
      const unsub = relayPool.subscribe(
        filters,
        relays,
        onEvent,
        maxDelayms,
        onEose,
        options
      );
      return unsub;
    },
    []
  );

  const [pubkey, setPubKey, removePubKey] = useLocalStorage<string | null>(
    WEB_STORAGE_KEYS.NPUB,
    null
  );

  const setAuthor = useCallback(
    (author: string) => {
      const { type, data } = (
        nip19 as unknown as {
          decode: (author: string) => { type: string; data: string };
        }
      ).decode(author);
      if (type !== "npub") {
        throw new Error("Please use npub");
      }
      setPubKey(data);
    },
    [setPubKey]
  );

  const removeRelay = useCallback(
    (url: string) => {
      let relays: string[] = [];
      const localStorageRelays = localStorage.getItem("relays");
      if (localStorageRelays !== null) {
        relays = JSON.parse(localStorageRelays);
      }
      relays = relays.filter((relay) => relay !== url);
      localStorage.setItem("relays", JSON.stringify(relays))
    },
    []
  )

  const signOut = useCallback(() => {
    removePubKey();
  }, [removePubKey]);

  return (
    <NostrContext.Provider
      value={{
        subscribe: relayPoolSubscribe,
        addRelay,
        removeRelay,
        defaultRelays: defaultRelays,
        setAuthor,
        pubkey,
        signOut,
      }}
    >
      {children}
    </NostrContext.Provider>
  );
};

export default NostrProvider;
