import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerQuizProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
}

export function DatePickerQuiz({ 
  value, 
  onChange, 
  placeholder = "Select your birth date",
  className 
}: DatePickerQuizProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      // Formata como YYYY-MM-DD para compatibilidade com o backend
      onChange(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal py-8 px-4 bg-card border-primary/30 hover:border-primary min-h-[64px] text-lg transition-colors",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 flex-shrink-0" />
          {date ? (
            <span className="text-foreground font-medium">
              {format(date, "dd/MM/yyyy")}
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(date) => date > new Date()}
          autoFocus
          className="pointer-events-auto"
          captionLayout="dropdown"
          startMonth={new Date(1940, 0)}
          endMonth={new Date()}
          defaultMonth={date || new Date(1990, 0)}
        />
      </PopoverContent>
    </Popover>
  );
}
