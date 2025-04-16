
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { Tooltip } from "flowbite-react";
export function MenuOpcoes({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Tooltip content="Adicionar Anotação">
        <Button color="green" outline onClick={onClick} className="rounded-2xl w-52 h-48 flex items-center justify-center cursor-pointer">
          <HiPlus className="text-2xl" />
        </Button>
      </Tooltip>
    </div>
  );
}
