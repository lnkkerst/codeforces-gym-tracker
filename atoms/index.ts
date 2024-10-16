import { atomWithStorage } from "jotai/utils";

export type AppSettings = {
  api: {
    key: string;
    secret: string;
  };
};
export const settingsAtom = atomWithStorage<AppSettings>(
  "gym-fetcher-settings",
  {
    api: {
      key: "",
      secret: "",
    },
  },
);
