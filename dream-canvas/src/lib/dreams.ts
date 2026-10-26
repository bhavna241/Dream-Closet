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
