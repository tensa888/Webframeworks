import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconBgColor?: string;
  iconColor?: string;
}

const StatCard = ({ icon: Icon, value, label, iconBgColor = "bg-primary/10", iconColor = "text-primary" }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBgColor)}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
