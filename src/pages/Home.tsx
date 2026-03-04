import { ArrowRight, Code2, Palette, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary animate-glow-pulse" />
              <span className="text-sm text-muted-foreground">Available for work</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
               I'M The Creative
              <span className="gradient-text glow-primary"> Developer</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Crafting beautiful digital experiences with clean code and stunning design
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/projects">
                <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover-lift">
                  View My Work
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="glass hover-glow">
                  About Me
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="glass hover-glow group">
                  <Mail className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: "Clean Code",
                description: "Writing maintainable, scalable, and efficient code that stands the test of time",
                delay: "0s"
              },
              {
                icon: Palette,
                title: "Beautiful Design",
                description: "Creating visually stunning interfaces with attention to every detail",
                delay: "0.1s"
              },
              {
                icon: Sparkles,
                title: "User Experience",
                description: "Delivering seamless interactions that users love and remember",
                delay: "0.2s"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover-lift hover-glow animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="ghost" size="lg" className="glass hover-glow group">
                <Mail className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span>Send me a message</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Build Something
                <span className="gradient-text"> Amazing</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Have a project in mind? Let's collaborate and create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover-lift group">
                    Get In Touch
                    <Mail className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="glass hover-glow">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Home;
