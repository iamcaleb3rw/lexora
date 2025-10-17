import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pin,
  Settings,
  Share2,
  ShieldCheck,
  Trash,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatisticCard13() {
  const total = 30;
  const passing = 20;

  return (
    <div className="flex col-span-8 md:col-span-4">
      <Card className="w-full">
        <CardHeader className="border-0 min-h-auto py-5">
          <CardTitle className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Resumé Strength Score
            </span>
          </CardTitle>
          <CardToolbar>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant={"secondary"}
                  className="-me-1.5 border border-muted-foreground/30"
                >
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuItem>
                  <Settings className="h-5 w-5" strokeWidth={1.5} />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TriangleAlert className="h-5 w-5" strokeWidth={1.5} /> Export
                  Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pin className="h-5 w-5" strokeWidth={1.5} /> Configure Alerts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="h-5 w-5" strokeWidth={1.5} /> Run Manual
                  Check
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.5} /> View
                  History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardToolbar>
        </CardHeader>

        <CardContent className="space-y-2.5">
          {/* Progress Bar */}
          <div className="flex grow gap-1">
            {[...Array(total)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  `inline-block w-3 h-4 rounded-sm border transition-colors`,
                  i < passing ? "bg-green-400" : "bg-muted border-muted"
                )}
              />
            ))}
          </div>

          {/* Passing Checks */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
            <span>{passing}/16 checks passing</span>
            <span className="font-semibold text-foreground">
              {Math.round((passing / total) * 100)}% assigned
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
