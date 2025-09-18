import { Link } from "wouter";
import { Briefcase, UserCheck, ClipboardList } from "lucide-react";

export function Explorer() {
  const links = [
    {
      href: "/jobs",
      icon: Briefcase,
      title: "JOBS",
      description: "Manage job postings and track applications"
    },
    {
      href: "/candidates", 
      icon: UserCheck,
      title: "CANDIDATES",
      description: "Review and evaluate potential hires"
    },
    {
      href: "/assessments",
      icon: ClipboardList,
      title: "ASSESSMENTS", 
      description: "Create and manage skill evaluations"
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-explore-title">
          Explore Platform
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-explore-description">
          Access comprehensive tools for managing your talent pipeline
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {links.map((link, index) => (
          <Link 
            key={link.href}
            href={link.href}
            data-testid={`link-explore-${link.title.toLowerCase()}`}
          >
            <div className="explore-link group block p-8 bg-card border border-border rounded-xl transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <link.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors" data-testid={`text-explore-title-${index}`}>
                  {link.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors" data-testid={`text-explore-description-${index}`}>
                  {link.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
