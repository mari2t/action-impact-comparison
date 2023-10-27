import { writable } from "svelte/store";

export const issue = writable("");
export const returned = writable(false);
export const actionCategories = [
  "🚀能力",
  "💴経済的状況",
  "🫶交友関係",
  "💪健康",
];

// selectedActions の初期値を設定
export const selectedActions = writable(
  actionCategories.map((category) => ({
    category,
    action: "どちらでもない", // 初期値。任意で変更可能
    memo: "-",
  }))
);

export function setReturned(value: boolean) {
  returned.set(value);
}
