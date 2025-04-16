
import { Spinner } from "flowbite-react";

export function SpinnerComponent() {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center h-screen">
      <Spinner color="success" aria-label="Spinner" />
    </div>
  );
}
