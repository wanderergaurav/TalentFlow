import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import type { Candidate } from "@shared/schema";

export default function CandidateDescription() {
  const { id } = useParams();

  const { data: candidate, isLoading, error } = useQuery<Candidate>({
    queryKey: ["/api/candidates", id],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/candidates">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Candidates
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/candidates">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Candidates
            </Button>
          </Link>
        </div>
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold text-foreground mb-2">Candidate not found</h3>
          <p className="text-muted-foreground">The candidate you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

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
    <div className="space-y-6" data-testid={`page-candidate-${candidate.id}`}>
      <div className="flex items-center justify-between">
        <Link href="/candidates" data-testid="link-back-to-candidates">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Candidates
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid={`button-edit-candidate-${candidate.id}`}>
            Edit Profile
          </Button>
          <Button variant="secondary" data-testid={`button-contact-candidate-${candidate.id}`}>
            Contact
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className={`w-24 h-24 bg-gradient-to-r ${gradientClass} rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className="text-2xl font-bold text-white" data-testid={`text-candidate-initials-${candidate.id}`}>
                {getInitials(candidate.name)}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground" data-testid={`text-candidate-name-${candidate.id}`}>
                    {candidate.name}
                  </h1>
                  {candidate.position && (
                    <p className="text-xl text-muted-foreground mt-1" data-testid={`text-candidate-position-${candidate.id}`}>
                      {candidate.position}
                    </p>
                  )}
                </div>
                <Badge 
                  variant={candidate.status === "Active" ? "default" : "secondary"}
                  data-testid={`badge-candidate-status-${candidate.id}`}
                >
                  {candidate.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span data-testid={`text-candidate-email-${candidate.id}`}>{candidate.email}</span>
                </div>
                {candidate.phone && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span data-testid={`text-candidate-phone-${candidate.id}`}>{candidate.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {candidate.experience && (
            <div className="pt-6 border-t border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Experience</h2>
              <p className="text-muted-foreground leading-relaxed" data-testid={`text-candidate-experience-${candidate.id}`}>
                {candidate.experience}
              </p>
            </div>
          )}

          {candidate.skills && candidate.skills.length > 0 && (
            <div className="pt-6 border-t border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2" data-testid={`skills-list-${candidate.id}`}>
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" data-testid={`skill-${candidate.id}-${index}`}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Added</h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-candidate-created-${candidate.id}`}>
                  {candidate.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Status</h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-candidate-status-detail-${candidate.id}`}>
                  {candidate.status || "Active"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
