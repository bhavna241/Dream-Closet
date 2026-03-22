export interface Dream {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  productLink?: string;
  targetDate?: string;
  priority?: "Low" | "Medium" | "High";
  personalNote?: string;
  category: "product" | "activity";
  status: "pending" | "completed";
  createdAt: string;
  completedAt?: string;
}
const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/dreams` : "http://localhost:5000/api/dreams";
const AUTH_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/auth` : "http://localhost:5000/api/auth";

const STORAGE_KEY = "dreamcloset_dreams";

export const getDreams = (): Dream[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveDream = (dream: Dream) => {
  const dreams = getDreams();
  dreams.push(dream);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
};

export const updateDream = (id: string, updates: Partial<Dream>) => {
  const dreams = getDreams().map((d) => (d.id === id ? { ...d, ...updates } : d));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
};

export const deleteDream = (id: string) => {
  const dreams = getDreams().filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
};
