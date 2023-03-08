import { useNostrContext } from "./NostrContext";
import useMetadata from "./useMetadata";

export enum PermissionLevel {
  None = 0,
  Read = 1,
  ReadWrite = 2,
}

const useSession = () => {
  const { pubkey } = useNostrContext();
  const metadata = useMetadata();

  const isLoggedIn = !!pubkey;

  const name = metadata.display_name || "Anonymous Nostrich";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return {
    isLoggedIn,
    permissionLevel: isLoggedIn ? PermissionLevel.Read : PermissionLevel.None,
    name,
    initials,
    picture: metadata.picture,
  };
};

export default useSession;
