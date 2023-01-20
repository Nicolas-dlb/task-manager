export default function uniqueId(): string {
  const prefix = "id";
  let c = 0;
  const r = Math.floor(Math.random() * 1000);
  const str = `-${c}-${r}`;
  c += 1;
  return prefix + str;
};
