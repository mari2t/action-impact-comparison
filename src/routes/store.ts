import { writable } from "svelte/store";

type ScoreInfo = {
  category: string | null; // ここを string に変更
  points: number | null;
  note: string | null;
};

export const issue = writable("");
export const actionScores = writable<ScoreInfo[]>([]);
export const inactionScores = writable<ScoreInfo[]>([]);
export const returned = writable(false); // boolean型のwritableストアに変更
// 各項目の選択状態を保持するためのストア
export const selectedActions = writable<{
  [key: string]: "行動する" | "考え中" | "行動しない";
}>({});

export function setReturned(value: boolean) {
  returned.set(value);
}
