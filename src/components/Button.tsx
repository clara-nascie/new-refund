import { classMerge } from "@/utils/ClassMerge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon";
};

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
  },
};

export function Button({
  children,
  isLoading,
  type = "button",
  variant = "base",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={classMerge([
        "flex items-center justify-center bg-green-100 rounded-lg text-white font-semibold cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-progress",
        variants.button[variant],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}
