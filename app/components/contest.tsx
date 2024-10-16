"use client";

import { useContestDetails } from "@/hooks/codeforces";
import Link from "next/link";
import { MdRefresh } from "react-icons/md";

export type ContestDetailsRowProps = {
  id: number;
};
export function ContestDetailsRow({ id }: ContestDetailsRowProps) {
  const { data, isLoading, error, mutate } = useContestDetails(id);

  const Content = () => {
    if (error) {
      return (
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
      );
    }
    if (isLoading || !data) {
      return <span className="loading loading-xs loading-spinner"></span>;
    }

    return (
      <Link
        className="link link-hover"
        href={`https://codeforces.com/gym/${id}`}
        target="_blank"
        prefetch={false}
      >
        {data.name}
      </Link>
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
      <td>
        <Content />
      </td>
    </tr>
  );
}

export type ContestDetailsTableProps = {
  ids: number[];
};
export function ContestDetailsTable({ ids }: ContestDetailsTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="w-24">ID</th>
          <th>名称</th>
        </tr>
      </thead>
      <tbody>
        {ids.map(id => (
          <ContestDetailsRow id={id} key={id} />
        ))}
      </tbody>
    </table>
  );
}
