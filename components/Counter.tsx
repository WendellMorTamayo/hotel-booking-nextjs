"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useController, Control } from "react-hook-form";
import { useState } from "react";

interface CounterProps {
  name: string;
  control: Control<any>;
}

export function Counter({ name, control }: CounterProps) {
  const [amount, setAmount] = useState(0);
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: 0,
  });

  function increase() {
    if (control) {
      onChange(value + 1);
    } else {
      setAmount(amount + 1);
    }
  }

  function decrease() {
    if (control) {
      if (value > 0) {
        onChange(value - 1);
      }
    } else {
      if (amount > 0) {
        setAmount(amount - 1);
      }
    }
  }

  return (
    <div className="flex items-center gap-x-4">
      <Button variant="outline" size="icon" type="button" onClick={decrease}>
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{value}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase}>
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
