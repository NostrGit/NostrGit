import { type Repository } from "@/data/repositories";
import { type ReactNode, createContext, useContext } from "react";
import useFollowers from "./useFollowers";
import { type Metadata } from "./useMetadata";

import useRepository from "./useRepository";

const RepositoryContext = createContext<{
    metadata: Metadata | null;
    repo: Repository | null;
    followers: string[] | null;
}>({
    metadata: null,
    repo: null,
    followers: null,
});

export const useRepositoryContext = () => {
  const context = useContext(RepositoryContext);
  if (context === null) {
    throw new Error(
      "useRepositoryContext must be used within RepositoryProvider"
    );
  }
  return context;
};

const RepositoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { metadata, repoInfo } = useRepository();
  const { followers } = useFollowers();
  return (
    <RepositoryContext.Provider
      value={{
        metadata,
        repo: repoInfo,
        followers,
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};

export default RepositoryProvider;
