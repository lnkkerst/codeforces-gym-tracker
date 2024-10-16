"use client";

import { settingsAtom } from "@/atoms";
import { useAtom } from "jotai";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { Dialog } from "./dialog";

export type SettingsDialogButtonProps = ComponentProps<"button">;
export function SettingsDialogButton(props: SettingsDialogButtonProps) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        {...props}
        onClick={e => {
          e.preventDefault();
          ref.current?.showModal();
        }}
      ></button>
      <Dialog ref={ref}>
        <SettingsForm onSave={() => ref.current?.close()} />
      </Dialog>
    </>
  );
}

export type SettingsFormProps = {
  onSave?: () => void;
};
export function SettingsForm({ onSave }: SettingsFormProps) {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [apiKey, setApiKey] = useState(settings.api.key);
  const [apiSecret, setApiSecret] = useState(settings.api.secret);

  useEffect(() => {
    setApiKey(settings.api.key);
    setApiSecret(settings.api.secret);
  }, [settings.api]);

  function save() {
    setSettings({
      api: {
        key: apiKey,
        secret: apiSecret,
      },
    });
  }

  function clearCache() {
    localStorage.clear();
    setSettings(settings);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-lg">设置</div>

      <input
        type="text"
        className="input input-bordered"
        placeholder="API Key"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
      />
      <input
        type="text"
        className="input input-bordered"
        placeholder="API Secret"
        value={apiSecret}
        onChange={e => setApiSecret(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <div
          className="tooltip tooltip-right"
          data-tip="清除比赛 ID 对应名称的缓存"
        >
          <button
            className="self-end btn btn-secondary"
            onClick={e => {
              e.preventDefault();
              clearCache();
              window.location.reload();
            }}
          >
            清除缓存
          </button>
        </div>

        <button
          className="self-end btn btn-primary w-20"
          onClick={e => {
            e.preventDefault();
            save();
            onSave?.();
          }}
        >
          保存
        </button>
      </div>
    </div>
  );
}
