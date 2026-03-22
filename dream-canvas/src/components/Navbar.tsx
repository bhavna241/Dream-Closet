import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50 px-6 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-xl font-heading font-bold text-foreground">
            Dream<span className="text-gradient">Closet</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="pastel-btn-secondary text-sm py-2 px-5">
            Log In
          </Link>
          <Link to="/dashboard" className="pastel-btn-primary text-sm py-2 px-5">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
