import { Download, Briefcase, GraduationCap, Award } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export const ResumeApp = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Resume</h1>
          <p className="text-muted-foreground">Professional Experience & Education</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Work Experience</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Senior Full Stack Developer</h3>
            <p className="text-primary mb-2">Tech Company Inc. • 2021 - Present</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Led development of microservices architecture serving 1M+ users</li>
              <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
              <li>Mentored junior developers and conducted code reviews</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Full Stack Developer</h3>
            <p className="text-primary mb-2">Digital Agency LLC • 2019 - 2021</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Built responsive web applications for various clients</li>
              <li>Collaborated with design team to implement pixel-perfect UIs</li>
              <li>Optimized application performance and SEO</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Education</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
            <p className="text-primary mb-2">University of Technology • 2015 - 2019</p>
            <p className="text-muted-foreground">GPA: 3.8/4.0 • Dean's List</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Certifications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "AWS Certified Solutions Architect",
            "Google Cloud Professional",
            "Certified Kubernetes Administrator",
            "MongoDB Certified Developer"
          ].map((cert) => (
            <div
              key={cert}
              className="px-4 py-3 bg-primary/10 text-primary rounded-md"
            >
              {cert}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
