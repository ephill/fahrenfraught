import { ModeToggle } from "@/components/modeToggle";
import { cn } from "@/lib/utils";
import { Thermometer } from "lucide-react";
import { Jersey_10 } from "next/font/google";

const Jersey = Jersey_10({ weight: "400", subsets: ["latin"] });

export const PageHeader = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center px-8 py-1">
        <Thermometer className="h-7 w-7 stroke-purple-400" />
        <div className={cn("mr-4 text-3xl", Jersey.className)}>
          Fahrenfraught
        </div>
        <div className="flex flex-1 items-end justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
