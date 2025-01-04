"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export function AccountButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push("/account")}
      className="ml-2"
    >
      <User className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}