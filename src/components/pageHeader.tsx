import { ModeToggle } from "@/components/modeToggle";
import { Thermometer } from "lucide-react";

export const PageHeader = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Thermometer className="stroke-purple-400" />
        <div className="mr-4 text-xl">Fahrenfraught</div>
        <div className="flex flex-1 items-end justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
