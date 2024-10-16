import {
  fetchAllParticipatedGymIds,
  fetchContestDetails,
} from "@/utils/codeforces";
import useSWR from "swr";
import { inRange } from "lodash-es";
import { Contest } from "codeforces-api-ts/dist/types";
import { queue } from "@/utils/queue";
import delay from "delay";

export function useAllParticipatedGymIds(username: string) {
  return useSWR(
    ["all-participated-gym-ids", username],
    async ([, username]) => {
      if (!inRange(username.length, 3, 25)) {
        return [];
      }
      return await queue.add(
        async () => {
          const ids = await fetchAllParticipatedGymIds({ username });
          await delay(2000);
          return ids;
        },
        { throwOnTimeout: true, priority: 100 },
      );
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
    },
  );
}

export function useContestDetails(id: number) {
  return useSWR(
    ["contest-details", id],
    async ([, id]) => {
      const storageKey = `contest-details-${id}`;
      const cachedDetails = localStorage.getItem(storageKey);

      if (cachedDetails) {
        return JSON.parse(cachedDetails) as Contest;
      }
      const details = await queue.add(async () => {
        const details = fetchContestDetails({ id });
        delay(2000);
        return details;
      });
      localStorage.setItem(storageKey, JSON.stringify(details));
      return details;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
    },
  );
}
