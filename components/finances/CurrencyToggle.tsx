"use client";

import { Button } from "@/components/ui/button";
import { useFinances } from "@/hooks/useFinances";
import { Currency } from "@/types/finance";

export function CurrencyToggle() {
  const { currency, setCurrency } = useFinances();

  const toggleCurrency = () => {
    setCurrency((curr: Currency) => curr === 'BGN' ? 'EUR' : 'BGN');
  };

  return (
    <Button variant="outline" onClick={toggleCurrency}>
      {currency}
    </Button>
  );
}