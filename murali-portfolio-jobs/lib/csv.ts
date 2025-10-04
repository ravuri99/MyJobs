export async function fetchCsv(url: string): Promise<string[][]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch CSV");
  const text = await res.text();
  const rows = text
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const cells: string[] = [];
      let cur = "", inQ = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
          else inQ = !inQ;
        } else if (c === "," && !inQ) {
          cells.push(cur); cur = "";
        } else cur += c;
      }
      cells.push(cur);
      return cells.map((s) => s.trim());
    });
  return rows;
}
