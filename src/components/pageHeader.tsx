import { ModeToggle } from "@/components/modeToggle";

export const PageHeader = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4">Fahrenfraught</div>
        <div className="flex flex-1 items-end justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
