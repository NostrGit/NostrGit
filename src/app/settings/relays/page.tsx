"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useNostrContext } from "../../../lib/nostr/NostrContext";
import SettingsHero from "@/components/settings-hero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function RelaysPage() {

  const { addRelay, removeRelay } = useNostrContext();
  const { register, handleSubmit, reset } = useForm();
  const [relays, setRelays] = useState<string[]>(() => {
    const relaysFromLocalStorage = localStorage.getItem("relays");
    return relaysFromLocalStorage ? JSON.parse(relaysFromLocalStorage) : [];
  });
  const [connecting, setConnecting] = useState<string>("");

  const fetchRelays = () => {
    const relaysFromStorage = localStorage.getItem("relays");
    if (relaysFromStorage !== null) {
      setRelays(JSON.parse(relaysFromStorage));
    }
  }

  const onFormSubmit = (data: FieldValues) => {
    if (addRelay && data.relay !== undefined) {
      setConnecting(data?.relay);
      setTimeout(() => {
        setConnecting("")
        fetchRelays();
      }, 500)
      addRelay(data?.relay);
      reset();
    }
  };

  const handleRemoval = (url: string) => {
    if (removeRelay && url !== undefined) {
      removeRelay(url);
      fetchRelays();
    }
  };

  return (
    <div>
      <SettingsHero title="Relays" />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label>
          Add relay
        </label>
        <Input
          type="text"
          id="relay"
          placeholder="wss://"
          defaultValue={"wss://"}
          required
          pattern="^wss:\/\/.*\..*$" // require "wss://"" and at least one dot
          maxLength={80}
          className="mt-2"
          {...register("relay")}
        />
        <div className="flex items-center">
          <Button
            className="h-8 mt-2 !border-[#383B42] bg-[#22262C]"
            variant="outline"
          >
            Add
          </Button>
          {connecting && <p className="ml-2 mt-2">Connecting...</p>}
        </div>
      </form>
      {relays.map((relay) => <div key={relay} className="flex mt-4">
        <XIcon
          className="text-red-400 cursor-pointer"
          onClick={() => handleRemoval(relay)}
        />
        <p className="ml-2">{relay}</p>
      </div>)}
    </div>
  );
}
