// store.ts
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
    memo: "",
  }))
);

export function setReturned(value: boolean) {
  returned.set(value);
}

// 項目の増減を管理するストア
export const extraCategories = writable<string[]>([]);

// 項目を増やす関数
export function addCategory() {
  extraCategories.update((current) => {
    return [...current, ""];
  });
}

// 項目を更新する関数
export function updateCategory(index: number, value: string) {
  extraCategories.update((current) => {
    const updated = [...current];
    updated[index] = value;
    return updated;
  });
}
