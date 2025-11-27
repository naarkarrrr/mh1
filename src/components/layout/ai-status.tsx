import { cn } from "@/lib/utils";

export function AiStatus({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2 text-xs font-mono", className)}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/80"></span>
            </span>
            <span className="text-muted-foreground">AI SYSTEMS: <span className="text-status-success">OPERATIONAL</span></span>
        </div>
    )
}
