import { useQuery, useMutation } from "@tanstack/react-query";
import { JobCard } from "../components";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Job } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Jobs() {
  const { toast } = useToast();

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/jobs/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({
        title: "Success",
        description: "Job status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive",
      });
    },
  });

  const handleJobEdit = (jobId: string) => {
    toast({
      title: "Edit Job",
      description: `Editing job ${jobId}`,
    });
  };

  const handleJobArchive = (job: Job) => {
    const newStatus = job.status === "Open" ? "Archived" : "Open";
    updateJobMutation.mutate({ id: job.id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Jobs</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-jobs-page-title">
            Jobs
          </h1>
          <p className="text-muted-foreground mt-2" data-testid="text-jobs-page-description">
            Manage your job postings and track applications
          </p>
        </div>
        <Button data-testid="button-add-job">
          <Plus className="h-4 w-4 mr-2" />
          Add Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-no-jobs-title">
              No jobs found
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="text-no-jobs-description">
              Get started by creating your first job posting.
            </p>
            <Button data-testid="button-create-first-job">
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={() => handleJobEdit(job.id)}
              onArchive={() => handleJobArchive(job)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
