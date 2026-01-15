"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Report } from "@/lib/schemas/reports.types";

const STATUS_OPTIONS: Report["status"][] = ["open", "in process", "closed"];

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);

      const res = await fetch(`/api/reports?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch reports");

      const data = await res.json();
      setReports(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter]);

  const updateStatus = async (
    reportId: string,
    newStatus: Report["status"]
  ) => {
    try {
      const res = await fetch(`/api/reports/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, id: reportId }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      // Optimistically update the UI
      setReports((prev) =>
        prev.map((r) => (r._id === reportId ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reports Administration</h1>

      {/* Filters */}
      <div className="flex gap-4 items-center mb-4">
        <Select
          value={statusFilter || "all"}
          onValueChange={(val) => setStatusFilter(val === "all" ? null : val)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem> {/* Non-empty value */}
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={fetchReports}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Refresh
        </Button>
      </div>

      {/* Reports table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="">
            <tr>
              <th className="px-4 py-2">Report ID</th>
              <th className="px-4 py-2">Sound ID</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No reports found.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report._id} className="border-t">
                  <td className="px-4 py-2">{report._id}</td>
                  <td className="px-4 py-2">{report.soundId}</td>
                  <td className="px-4 py-2">{report.reason}</td>
                  <td className="px-4 py-2">{report.userId}</td>
                  <td className="px-4 py-2">{report.status}</td>
                  <td className="px-4 py-2">{report.description || "-"}</td>
                  <td className="px-4 py-2">
                    {new Date(report.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {STATUS_OPTIONS.map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={
                          status === report.status ? "secondary" : "default"
                        }
                        onClick={() => updateStatus(report._id!, status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
