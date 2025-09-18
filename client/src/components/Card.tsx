import { Link } from "wouter";
import type { Job, Candidate } from "@shared/schema";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const gradients = [
    "from-primary to-blue-400",
    "from-emerald-500 to-teal-400", 
    "from-purple-500 to-pink-400",
    "from-orange-500 to-red-400",
    "from-indigo-500 to-purple-400",
  ];

  const gradientClass = gradients[Math.abs(candidate.name.charCodeAt(0)) % gradients.length];

  return (
    <Link href={`/candidates/${candidate.id}`} data-testid={`link-candidate-${candidate.id}`}>
      <div className="card-hover bg-card border border-border rounded-xl p-6 text-center group cursor-pointer">
        <div className="space-y-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${gradientClass} rounded-full flex items-center justify-center mx-auto`}>
            <span className="text-xl font-bold text-white" data-testid={`text-initials-${candidate.id}`}>
              {getInitials(candidate.name)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors" data-testid={`text-name-${candidate.id}`}>
              {candidate.name}
            </h3>
            <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors" data-testid={`text-email-${candidate.id}`}>
              {candidate.email}
            </p>
          </div>
          {candidate.position && (
            <div className="pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full" data-testid={`text-position-${candidate.id}`}>
                {candidate.position}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

interface JobCardProps {
  job: Job;
  onEdit: () => void;
  onArchive: () => void;
}

export function JobCard({ job, onEdit, onArchive }: JobCardProps) {
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const isArchived = job.status === "Archived";

  return (
    <div className={`card-hover bg-card border border-border rounded-xl p-6 group ${isArchived ? "opacity-70 bg-card/60" : ""}`} data-testid={`card-job-${job.id}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/jobs/${job.id}`} className="block group-hover:text-primary transition-colors" data-testid={`link-job-${job.id}`}>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-job-name-${job.id}`}>
                {job.name}
              </h3>
            </Link>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm" data-testid={`text-job-details-${job.id}`}>
                {job.mode} | {job.type}
              </p>
              <p className="text-muted-foreground text-sm" data-testid={`text-job-experience-${job.id}`}>
                {job.exp} Experience Required
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className={`w-3 h-3 rounded-full ${
              job.status === "Open" ? "bg-emerald-500" : 
              job.status === "Archived" ? "bg-amber-500" : "bg-red-500"
            }`}></span>
            <span className={`text-sm font-medium ${
              job.status === "Open" ? "text-emerald-500" : 
              job.status === "Archived" ? "text-amber-500" : "text-red-500"
            }`} data-testid={`text-job-status-${job.id}`}>
              {job.status}
            </span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button 
                className="action-button bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all" 
                onClick={(e) => handleActionClick(e, onEdit)}
                data-testid={`button-edit-job-${job.id}`}
              >
                Edit
              </button>
              <button 
                className="action-button bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all" 
                onClick={(e) => handleActionClick(e, onArchive)}
                data-testid={`button-archive-job-${job.id}`}
              >
                {job.status === "Open" ? "Archive" : "Unarchive"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
