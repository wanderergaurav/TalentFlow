import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";
import type { Job } from "@shared/schema";

export default function JobDescription() {
  const { id } = useParams();

  const { data: job, isLoading, error } = useQuery<Job>({
    queryKey: ["/api/jobs", id],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/jobs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/jobs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold text-foreground mb-2">Job not found</h3>
          <p className="text-muted-foreground">The job you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid={`page-job-${job.id}`}>
      <div className="flex items-center justify-between">
        <Link href="/jobs" data-testid="link-back-to-jobs">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid={`button-edit-job-${job.id}`}>
            Edit Job
          </Button>
          <Button 
            variant={job.status === "Open" ? "secondary" : "default"}
            data-testid={`button-archive-job-${job.id}`}
          >
            {job.status === "Open" ? "Archive" : "Unarchive"}
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8">
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-foreground" data-testid={`text-job-name-${job.id}`}>
                {job.name}
              </h1>
              <Badge 
                variant={job.status === "Open" ? "default" : job.status === "Archived" ? "secondary" : "destructive"}
                data-testid={`badge-job-status-${job.id}`}
              >
                {job.status}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span data-testid={`text-job-mode-${job.id}`}>{job.mode}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span data-testid={`text-job-type-${job.id}`}>{job.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span data-testid={`text-job-experience-${job.id}`}>{job.exp}</span>
              </div>
            </div>
          </div>

          {job.description && (
            <div className="pt-6 border-t border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-job-description-${job.id}`}>
                  {job.description}
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Posted</h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-job-created-${job.id}`}>
                  {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Applications</h3>
                <p className="text-sm text-muted-foreground">0 received</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
