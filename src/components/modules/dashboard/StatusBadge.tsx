import { Reservation } from "@/services/reservations";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export function StatusBadge({ status }: { status: Reservation["status"] }) {
    const config = {
        approved: { label: "Approved", icon: CheckCircle2, cls: "bg-accent/10 text-accent border-accent/20" },
        pending: { label: "Pending", icon: AlertCircle, cls: "bg-secondary/10 text-secondary border-secondary/20" },
        completed: { label: "Completed", icon: CheckCircle2, cls: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
        cancelled: { label: "Cancelled", icon: XCircle, cls: "bg-red-500/10 text-red-400 border-red-500/20" },
    };
    const { label, icon: Icon, cls } = config[status];
    return (
        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-body font-bold border ${cls}`}>
            <Icon className="h-2.5 w-2.5" />
            {label}
        </span>
    );
}