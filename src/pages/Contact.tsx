import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  User,
  Loader2,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

// Import your profile photo from your assets folder
import profileImg from "@/assets/clinton-profile.png";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'any';
  budget?: string;
  timeline?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const faqSectionRef = useRef<HTMLDivElement>(null); 
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "any",
    budget: "",
    timeline: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const scrollToFaqs = () => {
    faqSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone) {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        to_name: "IT SPECIALIST",
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || "Not provided",
        subject: formData.subject,
        message: formData.message,
        preferred_contact: formData.preferredContact,
        budget: formData.budget || "Not specified",
        timeline: formData.timeline || "Not specified",
        reply_to: formData.email,
      };

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.text === 'OK') {
        setIsSuccess(true);
        toast({
          title: "Message Sent! 🎉",
          description: "Successfully sent. I'll get back to you within 24 hours.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          preferredContact: "any",
          budget: "",
          timeline: "",
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to send message. Please try again or contact directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How quickly do you respond?",
      answer: "I typically respond within 24 hours during weekdays. For urgent matters, please mention 'URGENT' in your subject line."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! I offer a free 30-minute consultation to discuss your project requirements and see if we're a good fit."
    },
    {
      question: "What information should I include?",
      answer: "Include your project goals, budget range, timeline, and any specific requirements you have. The more details, the better!"
    },
    {
      question: "Can you sign an NDA?",
      answer: "Yes, I'm happy to sign a non-disclosure agreement before discussing sensitive project details."
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "IT specialist",
      link: "mailto:musigaziclinton89@gmail.com",
      isExternal: true,
      description: "Best for general inquiries"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+256 743942803",
      link: "tel:+256743942803",
      isExternal: true,
      description: "Mon-Fri, 9am-6pm EAT"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kampala, Uganda",
      link: "https://maps.google.com",
      isExternal: true,
      description: "Available for remote work worldwide"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "Usually much faster!"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/256clinton", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/adisa-music", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/adisa_music", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/adisa_music", label: "Instagram" },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center p-12 animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-3xl gradient-text">Message Sent!</CardTitle>
              <CardDescription className="text-lg mt-2">
                Thank you for reaching out. I'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                In the meantime, feel free to check out my work or connect on social media.
              </p>
              
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                  Send Another Message
                </Button>
                <Link to="/">
                  <Button className="w-full sm:w-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Go Back Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header Layout */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          <Link to="/" className="absolute left-0 top-0 hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Badge variant="outline" className="mb-4">Get In Touch</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a project in mind? I'd love to hear about it. Fill out the form below 
            and I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Sidebar with Integrated Profile Frame */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Gorgeous Floating Image Card Layout */}
            <Card className="overflow-hidden border border-border/60 shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent pointer-events-none" />
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 mb-4">
                  {/* Outer Pulsing Gradient Background Ring */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Circular Image Frame */}
                  <div className="relative w-full h-full rounded-full bg-secondary border border-white/10 overflow-hidden flex items-end justify-center shadow-inner">
                    <img 
                      src={profileImg} 
                      alt="Clinton Profile" 
                      className="w-[85%] h-[90%] object-contain object-bottom filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">Clinton</h2>
                <p className="text-xs text-primary font-semibold tracking-wide uppercase mt-1">Full Stack Developer & Systems Specialist</p>
              </CardContent>
            </Card>

            {/* Information Cards Array */}
            {contactInfo.map((item, index) => {
              const CardContentWrapper = () => (
                <Card className="hover:shadow-lg transition-all hover:scale-[1.02] h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-sm text-primary break-all font-medium mt-0.5">{item.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );

              if (item.link) {
                return item.isExternal ? (
                  <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                    <CardContentWrapper />
                  </a>
                ) : (
                  <Link key={index} to={item.link} className="block">
                    <CardContentWrapper />
                  </Link>
                );
              }

              return <div key={index}><CardContentWrapper /></div>;
            })}

            {/* Social Links Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Answers Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold">Quick Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.slice(0, 2).map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-xs mb-1">{faq.question}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
                <Button variant="link" className="px-0 text-xs h-auto pt-1" onClick={scrollToFaqs}>
                  View all FAQs ↓
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll respond within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+256 700 123456"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Project Inquiry"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`pl-10 ${errors.subject ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.subject && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                        <SelectTrigger><SelectValue placeholder="Select budget range" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<1000">Less than $1,000</SelectItem>
                          <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25000+">$25,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline (Optional)</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleSelectChange('timeline', value)}>
                        <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP (Within 1 week)</SelectItem>
                          <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                          <SelectItem value="1month">1 month</SelectItem>
                          <SelectItem value="1-3months">1-3 months</SelectItem>
                          <SelectItem value="flexible">Flexible / Not urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Contact Method</Label>
                    <div className="flex gap-4">
                      {['email', 'phone', 'any'].map((method) => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method}
                            checked={formData.preferredContact === method}
                            onChange={(e) => handleSelectChange('preferredContact', e.target.value)}
                            className="w-4 h-4 text-primary accent-primary"
                          />
                          <span className="text-sm capitalize">{method === 'any' ? 'No preference' : method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    <div className="flex justify-between text-xs">
                      <span className={errors.message ? 'text-red-500' : 'text-muted-foreground'}>
                        {errors.message || `Minimum 20 characters`}
                      </span>
                      <span className="text-muted-foreground">{formData.message.length}/5000</span>
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-accent" size="lg">
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Message...</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" /> Send Message</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div ref={faqSectionRef} className="max-w-3xl mx-auto mt-16 pt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    <span className="text-2xl">{activeFaq === index ? '−' : '+'}</span>
                  </div>
                  {activeFaq === index && (
                    <p className="mt-4 text-muted-foreground animate-fade-in">{faq.answer}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;