import { useState } from "react";
import { ExternalLink, Github, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "react-intersection-observer";

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  gradient: string;
  demoUrl?: string;
  codeUrl?: string;
  features?: string[];
  challenge?: string;
  solution?: string;
}

const Projects = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const projects: Project[] = [
    {
      title: "Musical Platform",
      description: "A full-stack music solution with real-time inventory management, payment processing, and admin dashboard.",
      longDescription: "Built a comprehensive e-commerce platform from scratch with modern tech stack. Features include real-time inventory tracking, secure payment processing, and an intuitive admin dashboard for managing products and orders.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsdWLXaKqTNrFp42jsW9eLyuPui4m0ZPj8gjkT3eonA&s",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      gradient: "from-blue-500 to-cyan-500",
      demoUrl: "https://tune-revenue-hub.lovable.app/",
      codeUrl: "https://github.com/256clinton/tune-revenue-hub.git",
      features: [
        "Real-time inventory updates",
        "Secure Stripe payment integration",
        "Admin dashboard with analytics",
        "User authentication and profiles",
        "Order tracking and history"
      ],
      challenge: "Managing real-time inventory across multiple concurrent users while ensuring data consistency.",
      solution: "Implemented WebSocket connections for live updates and used database transactions to prevent overselling."
    },
    {
      title: "Swap app(electric)",
      description: "Intelligent content creation tool powered by advanced AI models with customizable templates and workflows.",
      longDescription: "Developed an AI-powered content generation platform that helps creators produce high-quality content faster. Features customizable templates and automated workflows.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT44jt6bJIpVmUNWFqy7UbpDvvxBMc_zn2ma371h7Cyfg&s",
      tags: ["TypeScript", "OpenAI", "Next.js", "Tailwind"],
      gradient: "from-purple-500 to-pink-500",
      demoUrl: "https://ug-volt-flow.lovable.app",
      codeUrl: "https://github.com/256clinton/ug-volt-flow.git",
      features: [
        "Multiple AI models integration",
        "Custom template builder",
        "Content history and versioning",
        "SEO optimization suggestions",
        "Export to multiple formats"
      ],
      challenge: "Optimizing API calls to OpenAI to balance cost and response time while maintaining quality.",
      solution: "Implemented caching layer and request queuing system with fallback options for different models."
    },
    {
      title: "Task Management App",
      description: "Collaborative project management platform with real-time updates, file sharing, and team analytics.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      tags: ["React", "Firebase", "Material UI", "WebSockets"],
      gradient: "from-green-500 to-emerald-500",
      demoUrl: "https://bookbag-buddy.lovable.app",
      codeUrl: "https://github.com/256clinton/bookbag-buddy.git",
    },
    {
      title: "Portfolio CMS",
      description: "Custom content management system for creative professionals with drag-and-drop interface and SEO optimization.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["Vue.js", "Express", "MongoDB", "AWS"],
      gradient: "from-orange-500 to-red-500",
      demoUrl: "https://wifi-easy-bill.lovable.app",
      codeUrl: "https://github.com/256clinton/wifi-easy-bill.git",
    },
    {
      title: "Fitness Tracker",
      description: "Mobile-first fitness application with workout plans, progress tracking, and social features.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      tags: ["React Native", "GraphQL", "PostgreSQL", "Docker"],
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time data visualization platform with custom charts, reports, and predictive insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["React", "D3.js", "Python", "Redis"],
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  // Get unique tags for filtering
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

  // Filter projects based on selected tag
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  const handleDemoClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.demoUrl) {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Demo Coming Soon",
        description: `${project.title} demo is under development.`,
        duration: 3000,
      });
    }
  };

  const handleCodeClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.codeUrl) {
      window.open(project.codeUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Private Repository",
        description: "Code is available upon request. Contact me for access.",
        duration: 4000,
      });
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const fallbackImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80";

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section className="mb-12 md:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 animate-fade-in">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-in px-4" 
               style={{ animationDelay: '0.1s' }}>
              A showcase of my recent work, from concept to deployment. Each project represents
              a unique challenge and a creative solution.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-8 md:mb-12">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by technology:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center px-4">
              <Button
                key="all"
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="rounded-full text-xs sm:text-sm"
              >
                All Projects
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={filter === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(tag)}
                  className="rounded-full text-xs sm:text-sm"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => {
              const { ref, inView } = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <div
                  key={index}
                  ref={ref}
                  onClick={() => handleProjectClick(project)}
                  className={`group glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 transform hover:scale-[1.02] hover:shadow-2xl ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity z-10`} />
                    {!imageLoaded[index] && !imageError[index] && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    )}
                    <img
                      src={imageError[index] ? fallbackImage : project.image}
                      alt={project.title}
                      loading="lazy"
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                      onError={() => setImageError(prev => ({ ...prev, [index]: true }))}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 z-20" />
                  </div>

                  {/* Project Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 md:px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button
                        size="sm"
                        onClick={(e) => handleDemoClick(project, e)}
                        className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-xs sm:text-sm"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        Demo
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => handleCodeClick(project, e)}
                        className="flex-1 glass text-xs sm:text-sm"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No projects found with the selected filter.
              </p>
              <Button
                variant="link"
                onClick={() => setFilter("all")}
                className="mt-2"
              >
                Clear filter
              </Button>
            </div>
          )}
        </section>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl gradient-text">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2">
                    {selectedProject.longDescription || selectedProject.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Project Image */}
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>

                  {/* Features */}
                  {selectedProject.features && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Challenge & Solution */}
                  {selectedProject.challenge && selectedProject.solution && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">The Challenge</h4>
                        <p className="text-muted-foreground">{selectedProject.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">The Solution</h4>
                        <p className="text-muted-foreground">{selectedProject.solution}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {selectedProject.demoUrl && (
                      <Button
                        onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                        className="flex-1 bg-gradient-to-r from-primary to-accent"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Demo
                      </Button>
                    )}
                    {selectedProject.codeUrl && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(selectedProject.codeUrl, '_blank')}
                        className="flex-1"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <section className="mt-16 md:mt-24">
          <div className="max-w-4xl mx-auto glass rounded-2xl md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                Like What You See?
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                These are just a few examples. Let's discuss how I can help bring your ideas to life.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-105 text-sm md:text-base px-6 md:px-8"
                onClick={() => window.location.href = './contact'}
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;