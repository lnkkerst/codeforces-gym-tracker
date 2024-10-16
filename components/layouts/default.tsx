import Link from "next/link";
import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { SettingsDialogButton } from "../settings";

export type DefaultLayoutProps = {
  children?: ReactNode;
};
export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" prefetch={false} href="/">
            CF GYM 历史查询
          </Link>
        </div>

        <div className="flex-none">
          <div className="tooltip tooltip-bottom" data-tip="欢迎 Star :)">
            <Link
              className="btn btn-square btn-ghost"
              href="https://github.com/lnkkerst/codeforces-gym-tracker"
              target="_blank"
              prefetch={false}
            >
              <FaGithub className="size-6" />
            </Link>
          </div>

          <div className="tooltip tooltip-bottom" data-tip="设置">
            <SettingsDialogButton className="btn btn-square btn-ghost">
              <MdSettings className="size-6" />
            </SettingsDialogButton>
          </div>
        </div>
      </div>

      <div className="p-0 sm:p-4 w-[90%] max-w-[720px] mx-auto">{children}</div>
    </div>
  );
}
