import { Button } from "./Button";
import arrowLeft from "../assets/icons/arrowleft.svg";
import arrowRight from "../assets/icons/arrowright.svg";

type Props = {
  current: number;
  total: number;
};

export function Pagination({ current, total }: Props) {
  return (
    <div className="flex flex-1 justify-center items-center gap-4">
      <Button variant="iconSmall">
        <img src={arrowLeft} alt="Página anterior" />
      </Button>
      <span className="text-sm text-gray-200">
        {current}/{total}
      </span>
      <Button variant="iconSmall">
        <img src={arrowRight} alt="Próxima página" />
      </Button>
    </div>
  );
}
