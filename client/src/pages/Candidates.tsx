import { useQuery } from "@tanstack/react-query";
import { CandidateCard } from "../components";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Candidate } from "@shared/schema";
import { CandidatesListSkeleton } from "@/components/skeleton-cards";

export default function Candidates() {
  const { data: candidates = [], isLoading } = useQuery<Candidate[]>({
    queryKey: ["/api/candidates"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
            <p className="text-muted-foreground mt-2">
              Review and evaluate potential hires
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>
        <CandidatesListSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-candidates-page-title">
            Candidates
          </h1>
          <p className="text-muted-foreground mt-2" data-testid="text-candidates-page-description">
            Review and evaluate potential hires
          </p>
        </div>
        <Button data-testid="button-add-candidate">
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {candidates.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-no-candidates-title">
              No candidates found
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="text-no-candidates-description">
              Get started by adding your first candidate profile.
            </p>
            <Button data-testid="button-create-first-candidate">
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  );
}
