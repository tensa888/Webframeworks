import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, DollarSign } from "lucide-react";

interface OpportunityCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  deadline: string;
  matchPercentage: number;
  type: string;
}

const OpportunityCard = ({
  title,
  company,
  location,
  salary,
  deadline,
  matchPercentage,
  type,
}: OpportunityCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{company} • {type}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {salary}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {deadline}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className="text-success border-success bg-success/10">
            {matchPercentage}% Match
          </Badge>
          <Button size="sm">Apply Now</Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
