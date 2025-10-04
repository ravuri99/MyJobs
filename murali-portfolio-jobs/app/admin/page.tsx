'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/Container';
import JobCard, { Job } from '@/components/JobCard';
import { getJobsFromCsv } from '@/lib/jobs';

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_JOBS_CSV_URL || '';
    if (!url) return;
    getJobsFromCsv(url).then(setJobs).catch(console.error);
  }, []);

  const filtered = jobs.filter((j) => {
    const byStatus = statusFilter === 'all' || (j.status || '').toLowerCase() === statusFilter.toLowerCase();
    const term = search.toLowerCase();
    const bySearch =
      !term ||
      (j.companyName || '').toLowerCase().includes(term) ||
      (j.role || '').toLowerCase().includes(term);
    return byStatus && bySearch;
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-600">Manage all scraped jobs</p>
      </header>

      <Container>
        <div className="mb-4 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="Not Applied">Not Applied</option>
            <option value="Applied">Applied</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No jobs found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((j, i) => (
              <JobCard key={i} job={j} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
