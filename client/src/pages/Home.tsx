import { useQuery } from "@tanstack/react-query";
import { Explorer, CandidateCard, JobCard } from "../components";
import { Button } from "@/components/ui/button";
import type { Job, Candidate } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { toast } = useToast();

  const { data: jobs = [], isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const { data: candidates = [], isLoading: candidatesLoading } = useQuery<Candidate[]>({
    queryKey: ["/api/candidates"],
  });

  const handleJobEdit = (jobId: string) => {
    toast({
      title: "Edit Job",
      description: `Editing job ${jobId}`,
    });
  };

  const handleJobArchive = async (job: Job) => {
    try {
      const newStatus = job.status === "Open" ? "Archived" : "Open";
      await apiRequest("PATCH", `/api/jobs/${job.id}`, { status: newStatus });
      toast({
        title: "Job Updated",
        description: `Job ${newStatus.toLowerCase()} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive",
      });
    }
  };

  const activeJobs = jobs.filter(job => job.status === "Open");
  const recentCandidates = candidates.slice(0, 8);
  const recentJobs = jobs.slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent leading-tight" data-testid="text-hero-title">
            Modern Talent Management
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Streamline your hiring process with powerful tools for job management, candidate evaluation, and team collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="action-button" data-testid="button-get-started">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="action-button" data-testid="button-learn-more">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Explorer Component */}
      <Explorer />

      {/* Recent Candidates */}
      {candidatesLoading ? (
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loading Candidates...</h2>
          </div>
        </section>
      ) : recentCandidates.length > 0 ? (
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-candidates-title">
              Recent Candidates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-candidates-description">
              Connect with top talent in your pipeline
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Active Job Listings */}
      {jobsLoading ? (
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loading Jobs...</h2>
          </div>
        </section>
      ) : recentJobs.length > 0 ? (
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-jobs-title">
              Active Job Listings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-jobs-description">
              Manage your current job postings and track applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onEdit={() => handleJobEdit(job.id)}
                onArchive={() => handleJobArchive(job)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Platform Stats */}
      <section className="py-12">
        <div className="bg-card/30 border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2" data-testid="text-stats-title">
              Platform Overview
            </h2>
            <p className="text-muted-foreground" data-testid="text-stats-description">
              Your talent management at a glance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-active-jobs">
                {activeJobs.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2" data-testid="text-stat-candidates">
                {candidates.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Candidates</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2" data-testid="text-stat-pending">
                0
              </div>
              <div className="text-sm text-muted-foreground">Pending Reviews</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2" data-testid="text-stat-hires">
                0
              </div>
              <div className="text-sm text-muted-foreground">Hires This Month</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
