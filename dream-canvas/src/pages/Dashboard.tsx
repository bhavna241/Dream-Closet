import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  Compass,
  Sparkles,
  Check,
  ArrowLeft,
  Plus,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Dream } from "@/lib/dreams";
import DreamCard from "@/components/DreamCard";
import AddDreamForm from "@/components/AddDreamForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState<"product" | "activity">(
    "product"
  );
  const [activeFilter, setActiveFilter] = useState<
    "all" | "product" | "activity"
  >("all");

  const [userName, setUserName] = useState("");

  // 🔐 Protect dashboard
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(userData);
    setUserName(parsed.name);
  }, [navigate]);

  // 🔑 Get token
  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.token;
  };

  // 📥 Fetch dreams
  const fetchDreams = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/api/dreams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch dreams");
        return;
      }

      const data = await res.json();
      console.log("Fetched dreams:", data);

      const formattedDreams: Dream[] = data.map((dream: any) => ({
        id: dream._id,
        title: dream.title,
        description: dream.description || "",
        imageUrl: dream.imageUrl || "",
        productLink: dream.productLink || "",
        targetDate: dream.targetDate || "",
        priority: dream.priority || "Medium",
        personalNote: dream.note || "",
        category: dream.type,
        status: dream.status || "pending",
        createdAt: dream.createdAt || new Date().toISOString(),
        completedAt: dream.completedAt,
      }));

      setDreams(formattedDreams);
    } catch (error) {
      console.error("Error fetching dreams:", error);
      toast.error("Failed to fetch dreams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDreams();
  }, []);

  const refresh = useCallback(() => {
    fetchDreams();
  }, []);

  // 🔄 Toggle complete
  const toggleComplete = async (id: string) => {
    try {
      const token = getToken();
      if (!token) return;

      const dream = dreams.find((d) => d.id === id);
      if (!dream) return;

      const newStatus =
        dream.status === "completed" ? "pending" : "completed";

      await fetch(`${API_URL}/api/dreams/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          completedAt:
            newStatus === "completed"
              ? new Date().toISOString()
              : null,
        }),
      });

      fetchDreams();
      toast.success(newStatus === "completed" ? "Dream completed! 🎉" : "Dream moved to pending");
    } catch (error) {
      console.error("Error updating dream:", error);
      toast.error("Failed to update status");
    }
  };

  // 🗑 Delete dream
  const deleteDream = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dream?"
    );

    if (!confirmDelete) return;

    try {
      const token = getToken();
      if (!token) return;

      await fetch(`${API_URL}/api/dreams/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchDreams();
      toast.success("Dream deleted successfully 🗑️");
    } catch (error) {
      console.error("Error deleting dream:", error);
      toast.error("Failed to delete dream");
    }
  };

  const openForm = (category: "product" | "activity") => {
    setFormCategory(category);
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pendingDreams = dreams.filter(
    (d) =>
      d.status === "pending" &&
      (activeFilter === "all" || d.category === activeFilter)
  );

  const completedDreams = dreams
    .filter((d) => d.status === "completed")
    .sort(
      (a, b) =>
        new Date(b.completedAt || 0).getTime() -
        new Date(a.completedAt || 0).getTime()
    );

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="glass-card border-b border-border/50 px-6 py-4 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold text-foreground">
              DreamCloset
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {userName}
            </span>

            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>

        </div>
      </header>

      <div className="container mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

          {/* Main Section */}
          <div className="space-y-8">

            <div className="grid sm:grid-cols-2 gap-4">

              <button
                onClick={() => openForm("product")}
                className="dream-card flex items-center gap-4"
              >
                <ShoppingBag className="h-6 w-6" />
                <span>Products I Want</span>
                <Plus className="ml-auto h-4 w-4" />
              </button>

              <button
                onClick={() => openForm("activity")}
                className="dream-card flex items-center gap-4"
              >
                <Compass className="h-6 w-6" />
                <span>Activities & Dreams</span>
                <Plus className="ml-auto h-4 w-4" />
              </button>

            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p>Loading your dreams...</p>
              </div>
            ) : dreams.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center glass-card border border-border/50 rounded-2xl bg-card/30 shadow-lg">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">Your Dream Closet is Empty</h3>
                <p className="text-muted-foreground max-w-md">
                  Start adding products you want to buy or activities you want to experience. Your dreams belong here!
                </p>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => openForm("product")} className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors">Add Product</button>
                  <button onClick={() => openForm("activity")} className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors">Add Activity</button>
                </div>
              </div>
            ) : pendingDreams.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center glass-card border border-border/50 rounded-2xl bg-card/30">
                <p className="text-muted-foreground">
                  No active dreams to show. You've completed them or haven't added any yet!
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {pendingDreams.map((dream) => (
                  <DreamCard
                    key={dream.id}
                    dream={dream}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteDream}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <aside>

            <h1 className="text-2xl font-bold text-foreground">
              ✨ Welcome back, {userName}!
            </h1>

            <p className="text-muted-foreground mt-1">
              You have {pendingDreams.length} active dreams and{" "}
              {completedDreams.length} completed.
            </p>

            <h2 className="font-bold flex items-center gap-2 mt-6">
              <Check className="h-4 w-4" /> Recently Completed
            </h2>

            {completedDreams.map((dream) => (
              <div key={dream.id} className="mt-2 text-sm line-through">
                {dream.title}
              </div>
            ))}

          </aside>

        </div>
      </div>

      {showForm && (
        <AddDreamForm
          category={formCategory}
          onClose={() => setShowForm(false)}
          onAdded={refresh}
        />
      )}

    </div>
  );
};

export default Dashboard;