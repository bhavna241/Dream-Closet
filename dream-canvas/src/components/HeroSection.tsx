import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium">
            <Star className="h-4 w-4 text-primary fill-primary" />
            Your dreams deserve a home
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight text-foreground">
            Save your dreams,{" "}
            <span className="text-gradient">don't forget them</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Keep track of the things you want to buy, places you dream of visiting, 
            and activities you can't wait to try. Your personal dream board, 
            beautifully organized. ✨
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link to="/dashboard" className="pastel-btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm text-muted-foreground">Free forever • No credit card</span>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 pt-4">
            <div className="flex -space-x-2">
              {["🌸", "🦋", "🌙", "⭐"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">2,000+</span> dreamers already saving their wishes
            </p>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            {/* Decorative blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            
            <img
              src={heroIllustration}
              alt="Dreamy illustration of a girl on a crescent moon"
              className="relative w-full max-w-md lg:max-w-lg animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
