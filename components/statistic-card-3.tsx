import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function StatisticCard3() {
  const alerts = [
    { name: "Acme Corp", plan: "Enterprise", daysLeft: 3, renewUrl: "#" },
    { name: "Beta LLC", plan: "Pro", daysLeft: 5, renewUrl: "#" },
    { name: "Gamma Inc", plan: "Pro", daysLeft: 7, renewUrl: "#" },
  ];

  return (
    <div className="col-span-8 md:col-span-4">
      <Card className="w-full">
        <CardContent>
          {/* Stats Row */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                Total job applications
              </div>
              <div className="text-2xl font-bold text-foreground">24</div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                Subscriptions
              </div>
              <div className="text-2xl font-bold text-foreground">312</div>
            </div>
          </div>
          {/* Segmented Progress Bar */}
          <div className="flex items-center gap-0.5 w-full h-2.5 rounded-full overflow-hidden mb-3.5 bg-muted">
            <div className="bg-teal-400 h-full" style={{ width: "60%" }} />
            <div className="bg-destructive h-full" style={{ width: "30%" }} />
            <div className="bg-amber-400 h-full" style={{ width: "10%" }} />
          </div>
          {/* Legend */}
          <div className="flex items-center gap-5 mb-6">
            <div className="flex items-center gap-1 text-xs text-teal-600">
              <span className="size-2 rounded-full bg-teal-400 inline-block" />{" "}
              Accepted
            </div>
            <div className="flex items-center gap-1 text-xs text-destructive">
              <span className="size-2 rounded-full bg-destructive inline-block" />{" "}
              Rejected
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <span className="size-2 rounded-full bg-amber-400 inline-block" />{" "}
              Under review
              <span className="ms-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="size-3.5 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        Enterprise plans are custom contracts with premium
                        support.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
