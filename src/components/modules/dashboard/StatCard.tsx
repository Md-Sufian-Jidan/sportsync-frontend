import { useRef } from "react";
import { useAnimatedCounter } from "./AnimatedCounter";
import { useInView } from "framer-motion";

export function StatCard({ label, value, prefix = "", suffix = "", icon: Icon, trend, color }: {
    label: string; value: number; prefix?: string; suffix?: string;
    icon: React.ComponentType<any>; trend: string; color: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useAnimatedCounter(value, isInView);
    return (
        <div ref={ref} className="p-5 rounded-2xl border border-border bg-card/50 space-y-4">
            <div className="flex items-center justify-between">
                <span className="font-body text-xs text-muted-foreground">{label}</span>
                <div className={`p-2 rounded-lg bg-opacity-10 ${color}`}>
                    <Icon className={`h-4 w-4`} />
                </div>
            </div>
            <div>
                <p className="font-heading text-2xl font-black text-foreground">
                    {prefix}{count.toLocaleString()}{suffix}
                </p>
                <p className="font-body text-[11px] text-muted-foreground mt-1">{trend}</p>
            </div>
        </div>
    );
}