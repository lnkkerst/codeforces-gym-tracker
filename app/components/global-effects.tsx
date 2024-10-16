"use client";

import { settingsAtom } from "@/atoms";
import { client } from "@/utils/codeforces";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export function GlobalEffects() {
  const settings = useAtomValue(settingsAtom);
  useEffect(() => {
    client.setCredentials({
      API_KEY: settings.api.key,
      API_SECRET: settings.api.secret,
    });
  }, [settings.api.key, settings.api.secret]);
  return null;
}
