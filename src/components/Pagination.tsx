import { Button } from "./Button";
import arrowLeft from "../assets/icons/arrowleft.svg";
import arrowRight from "../assets/icons/arrowright.svg";

type Props = {
  current: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
};

export function Pagination({ current, total, onNext, onPrevious }: Props) {
  return (
    <div className="flex flex-1 justify-center items-center gap-2">
      <Button variant="iconSmall" onClick={onPrevious}
        disabled={current === 1}>
        <img src={arrowLeft} alt="Página anterior" />
      </Button>
      <span className="text-sm text-gray-200">
        {current}/{total}
      </span>
      <Button variant="iconSmall" onClick={onNext}>
        <img src={arrowRight} alt="Próxima página" />
      </Button>
    </div>
  );
}
