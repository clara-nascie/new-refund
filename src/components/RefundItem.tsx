import type { Refund } from "@/types/refund.types";

interface Props {
  refund: Refund;
}

export function RefundItem({ refund }: Props) {
  return (
    <a>{refund.name} - {refund.category} - {refund.value}</a>
  );
}