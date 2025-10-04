import Container from "@/components/Container";
import JobCard from "@/components/JobCard";
import { USERS } from "@/lib/users";
import { getJobsFromCsv } from "@/lib/jobs";

export default async function UserPage({ params }: { params: { user: string } }) {
  const u = USERS[params.user];
  if (!u) return <div className="py-24 text-center text-gray-600">User not found.</div>;

  const csvUrl = process.env[u.jobsCsvUrlEnv || "JOBS_CSV_URL"];
  const jobs = csvUrl ? await getJobsFromCsv(csvUrl) : [];

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        {u.avatar && <img src={u.avatar} alt="avatar" className="h-16 w-16 rounded-full border" />}
        <div>
          <h1 className="text-2xl font-bold">{u.name}</h1>
          <p className="text-sm text-gray-600">{u.title}</p>
        </div>
      </header>

      {u.about && (
        <Container>
          <p className="text-gray-800">{u.about}</p>
        </Container>
      )}

      <Container>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Jobs</h2>
          <p className="text-xs text-gray-500">Data source: Google Sheet (CSV)</p>
        </div>

        {jobs.length === 0 ? (
          <p className="text-sm text-gray-600">No jobs yet. Add rows in your sheet.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((j, idx) => (
              // @ts-ignore
              <JobCard key={idx} job={j} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
