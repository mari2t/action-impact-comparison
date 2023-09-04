import { writable } from "svelte/store";

type ScoreInfo = {
  category: string | null; // ここを string に変更
  points: number | null;
  note: string | null;
};

export const issue = writable("");
export const actionScores = writable<ScoreInfo[]>([]);
export const inactionScores = writable<ScoreInfo[]>([]);
