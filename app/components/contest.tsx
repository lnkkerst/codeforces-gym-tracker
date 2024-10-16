"use client";

import { useContestDetails } from "@/hooks/codeforces";
import Link from "next/link";
import { forwardRef } from "react";
import { MdRefresh } from "react-icons/md";

export type ContestDetailsRowProps = {
  id: number;
};
export function ContestDetailsRow({ id }: ContestDetailsRowProps) {
  const { data, isLoading, error, mutate, isValidating } =
    useContestDetails(id);

  const Content = () => {
    if (error && !isValidating) {
      return (
        <td>
          <div className="flex items-center gap-2">
            <button
              className="link link-hover"
              onClick={e => {
                e.preventDefault();
                mutate();
              }}
            >
              <MdRefresh />
            </button>
            <span className="text-sm text-error">
              {error?.message || "未知错误"}
            </span>
          </div>
        </td>
      );
    }
    if (isLoading || !data) {
      return (
        <td>
          <span className="loading loading-xs loading-spinner"></span>
        </td>
      );
    }

    const url = `https://codeforces.com/gym/${id}`;

    return (
      <>
        <td>
          <Link
            className="link link-hover"
            href={url}
            target="_blank"
            prefetch={false}
          >
            {data.name}
          </Link>
        </td>
        <td className="hidden">
          <Link
            className="link link-hover"
            href={url}
            target="_blank"
            prefetch={false}
          >
            {url}
          </Link>
        </td>
      </>
    );
  };

  return (
    <tr>
      <td>
        <Link
          className="link link-hover"
          href={`https://codeforces.com/gym/${id}`}
          target="_blank"
          prefetch={false}
        >
          {id}
        </Link>
      </td>
      <Content />
    </tr>
  );
}

export type ContestDetailsTableProps = {
  ids: number[];
};
export const ContestDetailsTable = forwardRef<
  HTMLTableElement,
  ContestDetailsTableProps
>(function ContestDetailsTable({ ids }: ContestDetailsTableProps, ref) {
  return (
    <table className="table" ref={ref}>
      <thead>
        <tr>
          <th className="w-24">ID</th>
          <th>名称</th>
          <th className="hidden">链接</th>
        </tr>
      </thead>
      <tbody>
        {ids.map(id => (
          <ContestDetailsRow id={id} key={id} />
        ))}
      </tbody>
    </table>
  );
});
