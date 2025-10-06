import { ExternalLink, Github } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export const ProjectsApp = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment integration, inventory management, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team collaboration features.",
      tech: ["React", "Firebase", "TypeScript"],
      github: "#",
      demo: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather tracking application with forecasts, maps, and historical data visualization.",
      tech: ["React", "OpenWeather API", "Chart.js"],
      github: "#",
      demo: "#",
    },
    {
      title: "Social Media Analytics",
      description: "Analytics platform for tracking social media metrics and generating insights.",
      tech: ["Python", "React", "MongoDB", "AWS"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">My Projects</h1>
      <p className="text-muted-foreground mb-8">Here are some of my recent works</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
              <Button size="sm" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
