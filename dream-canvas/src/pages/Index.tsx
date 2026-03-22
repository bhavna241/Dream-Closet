import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { Heart, MapPin, Sparkles } from "lucide-react";


const features = [
  {
    icon: Heart,
    title: "Wishlist Products",
    description: "Save the things you've been eyeing — gadgets, clothes, accessories, and more.",
    color: "bg-primary/15 text-primary-foreground",
  },
  {
    icon: MapPin,
    title: "Dream Destinations",
    description: "Pin the places you want to visit and the experiences you want to live.",
    color: "bg-secondary/15 text-secondary-foreground",
  },
  {
    icon: Sparkles,
    title: "Track Progress",
    description: "Mark your dreams as complete and celebrate every little win along the way.",
    color: "bg-accent/15 text-accent-foreground",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Everything you need to <span className="text-gradient">dream big</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              A beautifully simple way to organize all your future plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="dream-card text-center space-y-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mx-auto`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Made with 💖 by DreamCloset — Where dreams find a home</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
