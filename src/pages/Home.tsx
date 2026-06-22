import { ArrowRight, Code2, Palette, Sparkles, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Import your profile photo from your assets folder
import profileImg from "@/assets/clinton-profile.png";

const Home = () => {
  // Centralized button configurations for the hero section
  const heroActions = [
    {
      to: "/projects",
      label: "View My Work",
      variant: "default" as const,
      className: "bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover-lift group",
      icon: <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    },
    {
      to: "/about", 
      label: "About Me",
      variant: "outline" as const,
      className: "glass hover-glow group",
      icon: <User className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform text-muted-foreground" />
    }
  ];

  const features = [
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
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      
      {/* Dynamic Hero Section - Split Grid Setup */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-border/40 py-20 md:py-0">
        {/* Ambient Background Glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Side */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
              {/* Badge Indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/10 mb-6 animate-fade-in shadow-sm">
                <Sparkles className="w-4 h-4 text-primary animate-glow-pulse" />
                <span className="text-sm font-medium text-muted-foreground tracking-wide">Available for work</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                I'M The Creative
                <span className="block gradient-text glow-primary mt-2"> Developer</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Crafting beautiful digital experiences with clean code and stunning design. Specializing in highly efficient, full-stack ecosystems.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {heroActions.map((action, i) => (
                  <Link key={i} to={action.to} className="w-full sm:w-auto">
                    <Button size="lg" variant={action.variant} className={`w-full sm:w-auto ${action.className}`}>
                      {action.label}
                      {action.icon}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Interactive Image Presentation Container */}
            <div className="md:col-span-5 flex justify-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="relative group w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Vibrant Background Aura Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-accent/20 to-secondary/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
                
                {/* Modern Framed Circle Glass Card */}
                <div className="relative w-full h-full glass border border-white/10 rounded-full overflow-hidden flex items-end justify-center group-hover:border-primary/30 transition-all duration-500 shadow-2xl">
                  <img 
                    src={profileImg} 
                    alt="Clinton Profile" 
                    className="w-[85%] h-[90%] object-contain object-bottom filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.35)] group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-secondary/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 border border-border/50 hover-lift hover-glow transition-all duration-300 animate-fade-in group flex flex-col items-start"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-105">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-12 border-y border-border/45 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="ghost" size="lg" className="glass hover-glow border border-border/40 group">
                <Mail className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">Send me a message</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden max-w-5xl mx-auto border border-border/60 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Let's Build Something
                <span className="gradient-text"> Amazing</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Have a project in mind? Let's collaborate and create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover-lift group">
                    Get In Touch
                    <Mail className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link to="/projects" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto glass hover-glow">
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