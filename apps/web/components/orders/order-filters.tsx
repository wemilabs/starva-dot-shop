"use client";

import type { OrderStatus } from "@starva/db/schema";
import { ORDER_STATUS_VALUES } from "@starva/lib/constants";
import { Button } from "@starva/ui/components/button";
import { cn } from "@starva/ui/lib/utils";

interface OrderFiltersProps {
  selectedStatus: OrderStatus | "all";
  onStatusChange: (status: OrderStatus | "all") => void;
}

const filterOptions: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "All Orders" },
  ...ORDER_STATUS_VALUES.map(status => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  })),
];

export function OrderFilters({
  selectedStatus,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map(option => (
        <Button
          key={option.value}
          variant={selectedStatus === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(option.value)}
          className={cn(
            "transition-colors border",
            selectedStatus === option.value && "border-primary shadow-md",
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
