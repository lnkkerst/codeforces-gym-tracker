"use client";

import { useAllParticipatedGymIds } from "@/hooks/codeforces";
import { useEffect, useRef, useState } from "react";
import { ContestDetailsTable } from "./components/contest";
import { queue } from "@/utils/queue";
import { useAtomValue } from "jotai";
import { settingsAtom } from "@/atoms";
import Link from "next/link";
import { MdRefresh, MdSave } from "react-icons/md";
import { utils as xlsxUtils, writeFile as xlsxWriteFile } from "xlsx";

export default function Home() {
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const settings = useAtomValue(settingsAtom);
  const tableRef = useRef<HTMLTableElement>(null);

  const { data, isLoading, error, mutate, isValidating } =
    useAllParticipatedGymIds(username);

  function downloadTable() {
    const tableEl = tableRef.current;
    if (!tableEl) {
      return;
    }
    const book = xlsxUtils.table_to_book(tableEl);
    const ws = book.Sheets[book.SheetNames[0]];

    ws["!cols"] = [{ wch: 10 }, { wch: 50 }, { wch: 39 }];
    xlsxWriteFile(book, `gyms_${username}_${Date.now()}.xlsx`);
  }

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
      return <div className="text-center">没有找到任何 GYM :(</div>;
    }

    return (
      <div>
        <div className="flex items-center mb-4">
          <div className="text-sm text-base-content/80 pl-2 pr-6 flex-1">
            没有找到想要的 GYM？您可能需要
            <Link
              href="https://codeforces.com/settings/api"
              target="_blank"
              className="link link-accent link-hover"
              prefetch={false}
            >
              点这里
            </Link>
            申请一个 API Key 并将其填入右上角的设置中，以获取私有 GYM 的信息。
          </div>

          <div className="tooltip" data-tip="保存为表格文件">
            <button
              className="btn btn-circle btn-ghost no-animation flex-none"
              onClick={e => {
                e.preventDefault();
                downloadTable();
              }}
            >
              <MdSave className="size-6" />
            </button>
          </div>

          <div className="tooltip" data-tip="重新获取数据">
            <button
              className="btn btn-circle btn-ghost no-animation flex-none"
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
        </div>
        <ContestDetailsTable ids={data} ref={tableRef} />
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
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="用户名"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-20 flex-none" type="submit">
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
