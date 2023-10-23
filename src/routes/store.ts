import { writable } from "svelte/store";

export const issue = writable("");
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
