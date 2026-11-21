"use client";

import type { FeedbackStatus, FeedbackType } from "@starva/db/schema";
import {
  FEEDBACK_STATUS_VALUES,
  FEEDBACK_TYPE_VALUES,
  feedbackStatusOptions,
  feedbackTypeOptions,
} from "@starva/lib/constants";
import { Button } from "@starva/ui/components/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@starva/ui/components/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@starva/ui/components/select";
import { Separator } from "@starva/ui/components/separator";
import { cn } from "@starva/ui/lib/utils";
import { MessageSquare } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { FeedbackCard } from "@/components/admin/feedback-management/feedback-card";
import { SearchForm } from "@/components/forms/search-form";

interface FeedbackItem {
  id: string;
  type: FeedbackType;
  status: FeedbackStatus;
  subject: string;
  message: string;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

interface FeedbackListClientProps {
  feedback: FeedbackItem[];
}

export function FeedbackList({ feedback }: FeedbackListClientProps) {
  const [selectedType, setSelectedType] = useQueryState(
    "type",
    parseAsStringLiteral(["all", ...FEEDBACK_TYPE_VALUES] as const).withDefault(
      "all",
    ),
  );

  const [selectedStatus, setSelectedStatus] = useQueryState(
    "status",
    parseAsStringLiteral([
      "all",
      ...FEEDBACK_STATUS_VALUES,
    ] as const).withDefault("all"),
  );

  const [search] = useQueryState("search", { defaultValue: "" });

  const filteredFeedback = feedback.filter(item => {
    const typeMatch = selectedType === "all" || item.type === selectedType;
    const statusMatch =
      selectedStatus === "all" || item.status === selectedStatus;
    const searchMatch =
      search === "" ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase()) ||
      (item.user?.name?.toLowerCase().includes(search.toLowerCase()) ?? false);

    return typeMatch && statusMatch && searchMatch;
  });

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2">Type</h3>
            <div className="flex flex-wrap gap-2">
              {feedbackTypeOptions.map(option => (
                <Button
                  key={option.value}
                  variant={
                    selectedType === option.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedType(option.value)}
                  className={cn(
                    "transition-colors border",
                    selectedType === option.value && "border-primary shadow-md",
                  )}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
            <div>
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <Select
                value={selectedStatus}
                onValueChange={value =>
                  setSelectedStatus(value as FeedbackStatus)
                }
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {feedbackStatusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <SearchForm
              formProps={{
                className: "w-full sm:w-80",
              }}
              inputFieldOnlyClassName="h-9"
              placeholder="eg. subject, message, etc."
            />
          </div>
        </div>
      </div>

      {filteredFeedback.length === 0 ? (
        <Empty className="min-h-[300px]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquare className="size-6" />
            </EmptyMedia>
            <EmptyTitle>No feedback found</EmptyTitle>
            <EmptyDescription>
              {selectedType !== "all" ||
              selectedStatus !== "all" ||
              search !== ""
                ? "Try adjusting your filters"
                : "No feedback has been submitted yet"}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="space-y-4">
          {filteredFeedback.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <Separator className="mb-4" />}
              <FeedbackCard feedback={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
