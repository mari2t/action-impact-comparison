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
export const selectedActions = writable<
  Array<{
    category: string;
    action: "行動する" | "どちらでもない" | "行動しない";
    memo: string;
  }>
>([]);

export function setReturned(value: boolean) {
  returned.set(value);
}
