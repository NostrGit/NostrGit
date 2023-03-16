"use client";

import SettingsHero from "@/components/settings-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

import { XIcon } from "lucide-react";
import { type FieldValues, useForm } from "react-hook-form";

import { useNostrContext } from "../../../lib/nostr/NostrContext";

export default function RelaysPage() {
  const { addRelay, removeRelay, defaultRelays } = useNostrContext();
  const { register, handleSubmit, reset } = useForm();
  const [relays, setRelays] = useLocalStorage<string | null>(
    "relays",
    localStorage.getItem("relays") !== null
      ? localStorage.getItem("relays")
      : JSON.stringify(defaultRelays)
  );

  const onFormSubmit = (data: FieldValues) => {
    if (addRelay && data.relay !== undefined) {
      setRelays(
        JSON.stringify([
          data?.relay,
          ...(JSON.parse(relays || JSON.stringify(defaultRelays)) as string),
        ])
      );
      addRelay(data?.relay as string);
      reset();
    }
  };

  const handleRemoval = (url: string) => {
    if (removeRelay && url !== undefined) {
      removeRelay(url);
      const newRelays = relays
        ? relays.replace(`"${url}",`, "")
        : JSON.stringify(defaultRelays);
      setRelays(newRelays);
    }
  };

  const parsedRelays = (relays: string) => JSON.parse(relays) as string[];

  return (
    <div>
      <SettingsHero title="Relays" />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label>Add relay</label>
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
        </div>
      </form>
      {relays !== null &&
        parsedRelays(relays).map((relay: string) => {
          return (
            <div key={relay} className="flex mt-4">
              <XIcon
                className="text-red-400 cursor-pointer"
                onClick={() => handleRemoval(relay)}
              />
              <p className="ml-2">{relay}</p>
            </div>
          );
        })}
    </div>
  );
}
