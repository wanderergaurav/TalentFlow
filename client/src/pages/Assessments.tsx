import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList } from "lucide-react";
import type { Assessment } from "@shared/schema";

export default function Assessments() {
  const { data: assessments = [], isLoading } = useQuery<Assessment[]>({
    queryKey: ["/api/assessments"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Assessments</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Assessment
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-assessments-page-title">
            Assessments
          </h1>
          <p className="text-muted-foreground mt-2" data-testid="text-assessments-page-description">
            Create and manage skill evaluations
          </p>
        </div>
        <Button data-testid="button-create-assessment">
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      {assessments.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <div className="max-w-md mx-auto">
            <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-no-assessments-title">
              No assessments found
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="text-no-assessments-description">
              Get started by creating your first skill evaluation assessment.
            </p>
            <Button data-testid="button-create-first-assessment">
              <Plus className="h-4 w-4 mr-2" />
              Create Assessment
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <div 
              key={assessment.id} 
              className="card-hover bg-card border border-border rounded-xl p-6"
              data-testid={`card-assessment-${assessment.id}`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-assessment-title-${assessment.id}`}>
                      {assessment.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`text-assessment-type-${assessment.id}`}>
                      {assessment.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`w-3 h-3 rounded-full ${
                      assessment.status === "Completed" ? "bg-emerald-500" : 
                      assessment.status === "In Progress" ? "bg-amber-500" : "bg-muted-foreground"
                    }`}></span>
                    <span className={`text-sm font-medium ${
                      assessment.status === "Completed" ? "text-emerald-500" : 
                      assessment.status === "In Progress" ? "text-amber-500" : "text-muted-foreground"
                    }`} data-testid={`text-assessment-status-${assessment.id}`}>
                      {assessment.status}
                    </span>
                  </div>
                </div>

                {assessment.score && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Score: <span className="font-medium text-foreground">{assessment.score}/100</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
