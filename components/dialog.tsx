import { forwardRef, ReactNode } from "react";

export type DialogProps = {
  children?: ReactNode;
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  function Dialog({ children }, ref) {
    return (
      <dialog className="modal" ref={ref}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {children}
        </div>
      </dialog>
    );
  },
);
