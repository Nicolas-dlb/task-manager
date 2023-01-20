import { ItemT } from "../types/types";

export default async function getData(url: string): Promise<ItemT> {
  const request = await fetch(`https://noembed.com/embed?url=${url}`);
  const bookmark: ItemT = await request.json();
  return bookmark;
}
