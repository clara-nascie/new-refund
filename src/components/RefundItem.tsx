export type RefundItemProps = {
  id: string;
  name: string;
  description: string;
  amount: string;
  categoryImg: string;
};

//tipos passados para o componentRefundItemProps
type Props = React.ComponentProps<"a"> & {
  data: RefundItemProps;
};

export function RefundItem({ data, ...rest }: Props) {
  return (
    <a
      className="flex items-center gap-3 hover:bg-green-100/5
      cursor-pointer rounded-md p-2"
      {...rest}
    >
      <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
        <img src={data.categoryImg} alt="ícone da categoria" className="w-6 h-6" />
      </div>
      <div className="flex flex-col flex-1">
        <strong className=" text-sm text-gray-100">{data.name}</strong>
        <span className="text-xs text-gray-200">{data.description}</span>
      </div>
      <span className="text-sm text-gray-100 font-semibold">
        <small className="font-normal text-gray-200">R$ </small>
        {data.amount}
      </span>
    </a>
  );
}
