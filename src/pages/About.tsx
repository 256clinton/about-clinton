import { Code, Lightbulb, Rocket, Target } from "lucide-react";

const About = () => {
  const skills = [
    { name: "React & TypeScript", level: 95 },
    { name: "UI/UX Design", level: 90 },
    { name: "Node.js & APIs", level: 85 },
    { name: "CSS & Animations", level: 92 },
    { name: "Database Design", level: 80 },
    { name: "Cloud Services", level: 88 },
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every pixel, every line of code matters. I focus on the details that make experiences exceptional.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly exploring new technologies and approaches to solve problems creatively.",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Building fast, optimized applications that deliver results and delight users.",
    },
    {
      icon: Code,
      title: "Quality",
      description: "Writing clean, maintainable code that follows best practices and stands the test of time.",
    },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
              I'm a passionate developer and designer with over 5 years of experience creating
              digital products that combine beautiful aesthetics with powerful functionality.
              My mission is to bridge the gap between design and development, creating seamless
              experiences that users love.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-6 animate-fade-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-lg">{skill.name}</span>
                    <span className="text-primary font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Core <span className="gradient-text">Values</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-8 hover-lift hover-glow animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mt-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="gradient-text">Journey</span>
            </h2>
            <div className="space-y-8">
              {[
                {
                  year: "2023 - Present",
                  title: "Senior Full Stack Developer",
                  company: "Tech Innovations Inc.",
                  description: "Leading development of cutting-edge web applications using modern technologies.",
                },
                {
                  year: "2021 - 2023",
                  title: "Full Stack Developer",
                  company: "Digital Solutions Ltd.",
                  description: "Built scalable applications and mentored junior developers.",
                },
                {
                  year: "2019 - 2021",
                  title: "Frontend Developer",
                  company: "Creative Agency",
                  description: "Created stunning user interfaces and interactive experiences.",
                },
              ].map((exp, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-6 animate-fade-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                    <span className="text-sm font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 w-fit">
                      {exp.year}
                    </span>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                  </div>
                  <p className="text-accent font-semibold mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
