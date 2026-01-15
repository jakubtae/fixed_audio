"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportDialogProps {
  soundId: string;
  ShowReportDialog: boolean;
  setShowReportDialog: (value: boolean) => void;
}

const REASONS = [
  "copyright",
  "hate_speech",
  "explicit_content",
  "harassment",
  "spam",
  "other",
];
import { authClient } from "@/auth-client";

export default function ReportDialog({
  soundId,
  ShowReportDialog,
  setShowReportDialog,
}: ReportDialogProps) {
  const { data: session } = authClient.useSession();
  const [reason, setReason] = useState<string>("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!reason) {
      setError("Please select a reason");
      return;
    }
    if (!session?.user.id) {
      setError("You must be logged in to submit a report!");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soundId,
          reason,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit report");
      } else {
        setSuccess(true);
        setReason("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={ShowReportDialog} onOpenChange={setShowReportDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Report this audio</DialogTitle>
          <DialogDescription>
            Report this audio if you find it inappropriate or offensive.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Select onValueChange={(val) => setReason(val)} value={reason}>
            <SelectTrigger>
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              {REASONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {reason === "other" && (
            <Textarea
              placeholder="Describe the issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Report submitted successfully!
            </p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
