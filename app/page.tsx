"use client";

import { useAllParticipatedGymIds } from "@/hooks/codeforces";
import { useEffect, useState } from "react";
import { ContestDetailsTable } from "./components/contest";
import { queue } from "@/utils/queue";
import { useAtomValue } from "jotai";
import { settingsAtom } from "@/atoms";
import Link from "next/link";
import { MdRefresh } from "react-icons/md";

export default function Home() {
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const settings = useAtomValue(settingsAtom);

  const { data, isLoading, error, mutate, isValidating } =
    useAllParticipatedGymIds(username);

  useEffect(() => {
    mutate();
  }, [settings, mutate]);

  const Content = () => {
    if (username.length === 0) {
      return <div className="text-center">请输入用户名</div>;
    }

    if (error && !isValidating) {
      return (
        <div className="text-center text-error">
          {error?.message || "未知错误"}
        </div>
      );
    }

    if (isLoading || !data) {
      return (
        <div className="flex justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      );
    }

    if (data.length === 0) {
      return <div className="text-center text-warning">没有找到任何 GYM</div>;
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4 gap-6">
          <div className="text-sm text-base-content/80 pl-2">
            没有找到想要的 GYM？您可能需要
            <Link
              href="https://codeforces.com/settings/api"
              target="_blank"
              className="link"
              prefetch={false}
            >
              点这里
            </Link>
            申请一个 API Key 并将其填入左上角的设置中
          </div>
          <button
            className="btn btn-circle btn-ghost no-animation"
            disabled={isValidating}
            onClick={e => {
              e.preventDefault();
              mutate();
            }}
          >
            {isValidating ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <MdRefresh className="size-6" />
            )}
          </button>
        </div>
        <ContestDetailsTable ids={data} />
      </div>
    );
  };

  return (
    <div className="my-4">
      <form
        onSubmit={e => {
          e.preventDefault();
          queue.clear();
          setUsername(input);
        }}
      >
        <div className="flex flex-row items-center gap-4">
          <input
            type="text"
            className="input input-bordered grow"
            placeholder="用户名"
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <button className="btn btn-primary w-20" type="submit">
            查询
          </button>
        </div>
      </form>

      <div className="mt-6">
        <Content />
      </div>
    </div>
  );
}
