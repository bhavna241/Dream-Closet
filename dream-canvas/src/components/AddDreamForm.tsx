import { toast } from "sonner";
import { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface AddDreamFormProps {
  category: "product" | "activity";
  onClose: () => void;
  onAdded: () => void;
}

const AddDreamForm = ({ category, onClose, onAdded }: AddDreamFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [productLink, setProductLink] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user?.token;

      if (!token) {
        toast.error("Not authorized. Please login again.");
        return;
      }

      const dreamData = {
        title,
        description,
        type: category,
        priority,
        productLink,
        targetDate: targetDate || undefined,
        imageUrl,
        note: personalNote,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/dreams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 IMPORTANT
        },
        body: JSON.stringify(dreamData),
      });

      if (!response.ok) {
        throw new Error("Failed to add dream");
      }

      onAdded();
      onClose();
      toast.success("Dream added successfully ✨");
    } catch (err) {
      console.error("Error adding dream:", err);
      toast.error("Failed to add dream");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-lg p-6 space-y-5 bg-card/95 shadow-2xl overflow-y-auto max-h-[90vh] rounded-2xl border border-border/50">
        <div className="flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-sm pb-2 z-10">
          <h2 className="text-xl font-heading font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Add a New {category === "product" ? "Product" : "Activity"}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <input
              className={inputClass}
              placeholder="Dream Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className={`${inputClass} resize-none h-20`}
              placeholder="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
                <select
                  className={inputClass}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Target Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
            </div>

            {category === "product" && (
              <input
                type="url"
                className={inputClass}
                placeholder="Product Link (Optional)"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
              />
            )}

            <input
              type="url"
              className={inputClass}
              placeholder="Image URL (Optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <textarea
              className={`${inputClass} resize-none h-16`}
              placeholder="Personal Note (Optional)"
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {loading ? "Adding..." : "Add Dream ✨"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDreamForm;