import { Dream } from "@/lib/dreams";
import { Check, ExternalLink, Heart, Trash2, Calendar, FileText, Sparkles } from "lucide-react";

interface DreamCardProps {
  dream: Dream;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const DreamCard = ({ dream, onToggleComplete, onDelete }: DreamCardProps) => {
  const isCompleted = dream.status === "completed";

  const getPriorityColor = () => {
    switch (dream.priority) {
      case "High": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Medium": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Low": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div
      className={`relative dream-card overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/50 bg-card/60 backdrop-blur-md ${isCompleted ? "opacity-75 grayscale-[0.2]" : ""
        }`}
    >
      {dream.imageUrl && (
        <div className="relative -mx-5 -mt-5 mb-4 h-48 overflow-hidden rounded-t-2xl">
          <img
            src={dream.imageUrl}
            alt={dream.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {dream.category === "product" ? (
            <span className="bg-peach/20 text-peach-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-peach/30 backdrop-blur-sm">
              🛍️ Product
            </span>
          ) : (
            <span className="bg-lavender/20 text-lavender-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-lavender/30 backdrop-blur-sm">
              ✨ Activity
            </span>
          )}
          
          {dream.priority && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getPriorityColor()}`}>
              {dream.priority}
            </span>
          )}
        </div>

        <div>
          <h3
            className={`font-heading font-bold text-lg text-foreground transition-colors ${isCompleted ? "line-through text-muted-foreground" : ""
              }`}
          >
            {dream.title}
          </h3>
          
          {dream.description && (
            <p className="text-sm text-card-foreground/80 mt-1 line-clamp-2">
              <FileText className="h-3 w-3 inline-block mr-1 opacity-70" />
              {dream.description}
            </p>
          )}
        </div>

        {dream.targetDate && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 w-fit px-2 py-1 rounded-md">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(dream.targetDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        )}

        {dream.personalNote && (
          <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 relative">
            <Heart className="h-3 w-3 text-primary absolute top-3 left-3" />
            <p className="text-xs text-muted-foreground italic pl-5 line-clamp-2">
              {dream.personalNote}
            </p>
          </div>
        )}

        {dream.productLink && (
          <a
            href={dream.productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/link bg-primary/10 px-3 py-1.5 rounded-lg w-fit"
          >
            View Product <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        )}

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/50">
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors ${isCompleted
              ? "bg-mint/20 text-mint border border-mint/30"
              : "bg-muted text-muted-foreground border border-border"
              }`}
          >
            {isCompleted ? <><Check className="h-3 w-3"/> Completed</> : <><Sparkles className="h-3 w-3"/> Pending</>}
          </span>

          <div className="flex items-center gap-2">
            {/* Complete Button */}
            <button
              onClick={() => onToggleComplete(dream.id)}
              title={isCompleted ? "Mark Pending" : "Mark Complete"}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isCompleted
                ? "bg-mint border-mint text-mint-foreground shadow-[0_0_15px_rgba(var(--color-mint),0.4)]"
                : "border-border hover:border-mint hover:text-mint hover:bg-mint/10 bg-background"
                }`}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : <div className="w-3 h-3 rounded-full bg-border group-hover:bg-mint/50 transition-colors" />}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(dream.id)}
              title="Delete Dream"
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors hover:scale-110 active:scale-95 bg-background border border-border hover:border-destructive/30"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamCard;