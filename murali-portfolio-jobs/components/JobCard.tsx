export type Job = {
  date?: string;
  jobBoard?: string;
  status?: string;
  hyperlink?: string;
  companyName?: string;
  role?: string;
  jd?: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{job.role || "Role N/A"}</h3>
          <p className="text-sm text-gray-600">{job.companyName || "Company N/A"}</p>
          <p className="mt-1 text-xs text-gray-500">
            {job.jobBoard ? `${job.jobBoard}` : ""}{job.status ? ` • ${job.status}` : ""}
            {job.date ? ` • ${job.date}` : ""}
          </p>
        </div>
        {job.hyperlink && (
          <a
            href={job.hyperlink}
            target="_blank"
            className="inline-flex shrink-0 items-center rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
          >
            View Post
          </a>
        )}
      </div>
      {job.jd && (
        <details className="mt-3 group">
          <summary className="cursor-pointer text-sm font-medium text-blue-600">Job Description</summary>
          <pre className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-800">{job.jd}</pre>
        </details>
      )}
    </div>
  );
}
