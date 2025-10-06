import { User, Mail, MapPin, Briefcase } from "lucide-react";
import { Card } from "../ui/card";

export const ProfileApp = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-start gap-6 mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <User className="w-16 h-16 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">John Doe</h1>
          <p className="text-xl text-primary mb-4">Full Stack Developer</p>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>5+ years experience</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I'm a passionate full-stack developer with expertise in modern web technologies. 
          I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          My journey in tech started with a curiosity about how websites work, and it has evolved into 
          a career where I get to build amazing products every day. I specialize in React, TypeScript, 
          Node.js, and cloud technologies.
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "React", "TypeScript", "Node.js", "Python", "AWS", "Docker",
            "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "CI/CD"
          ].map((skill) => (
            <div
              key={skill}
              className="px-4 py-2 bg-primary/10 text-primary rounded-md text-center font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
