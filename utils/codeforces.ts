import { CodeforcesAPI as client } from "codeforces-api-ts";
import { Contest } from "codeforces-api-ts/dist/types";
import { uniq } from "lodash-es";
export { client };

export async function fetchAllParticipatedGymIds({
  username,
}: {
  username: string;
}) {
  const response = await client.call("user.status", { handle: username });
  if (response.status === "FAILED") {
    throw new Error(response.comment);
  }
  const gyms = uniq(
    response.result
      .filter(
        item =>
          item.contestId !== undefined &&
          item.contestId.toString().length === 6,
      )
      .map(item => item.contestId!),
  );
  return gyms;
}

export async function fetchContestDetails({ id }: { id: number }) {
  const response = await client.call("contest.standings", {
    contestId: id,
    count: 1,
  });
  if (response.status === "FAILED") {
    throw new Error(response.comment);
  }
  // eslint-disable-next-line
  return (response.result as any).contest as Contest;
}
