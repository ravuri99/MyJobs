import { fetchCsv } from "./csv";

export type Job = {
  date?: string;
  jobBoard?: string;
  status?: string;
  hyperlink?: string;
  companyName?: string;
  role?: string;
  jd?: string;
};

const HEADER_MAP = {
  date: ["date"],
  jobBoard: ["job board", "jobboard"],
  status: ["status"],
  hyperlink: ["hyperlink", "link", "url"],
  companyName: ["companyname", "company", "company name"],
  role: ["role", "job role", "title", "job title"],
  jd: ["jd", "job description", "description"]
};

function normalize(s?: string) {
  return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

export async function getJobsFromCsv(csvUrl: string): Promise<Job[]> {
  const rows = await fetchCsv(csvUrl);
  if (!rows.length) return [];
  const header = rows[0].map(normalize);
  const idx = (keys: string[]) => header.findIndex((h) => keys.includes(h));

  const iDate = idx(HEADER_MAP.date);
  const iBoard = idx(HEADER_MAP.jobBoard);
  const iStatus = idx(HEADER_MAP.status);
  const iLink = idx(HEADER_MAP.hyperlink);
  const iCompany = idx(HEADER_MAP.companyName);
  const iRole = idx(HEADER_MAP.role);
  const iJD = idx(HEADER_MAP.jd);

  return rows.slice(1).map((r) => ({
    date: r[iDate] || "",
    jobBoard: r[iBoard] || "",
    status: r[iStatus] || "",
    hyperlink: r[iLink] || "",
    companyName: r[iCompany] || "",
    role: r[iRole] || "",
    jd: r[iJD] || ""
  }));
}
