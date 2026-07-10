import upload from "@/assets/icons/upload.svg";

type Props = React.ComponentProps<"input"> & {
  fileName?: string | null;
};

export function Upload({ fileName = null, ...rest }: Props) {
  return (
    <div>
      <legend className="uppercase text-xxs text-gray-200 mb-2">
        Comprovante
      </legend>
      <div
        className="w-full h-12 flex items-center justify-between pl-4 rounded-lg border
       border-gray-300 text-sm text-gray-100 bg-transparent outline-none overflow-hidden"
      >
        <input type="file" id="upload" className="hidden"{...rest} />
        <span>{fileName ?? "Anexar arquivo"}</span>
        <label
          className="flex h-12 px-4 items-center bg-green-100 rounded-lg
          cursor-pointer disabled:opacity-50 hover:bg-green-200
          transition ease-linear"
          htmlFor="upload"
        >
          <img src={upload} alt="Ícone de upload" className="w-6 h-6"/>
        </label>
      </div>
    </div>
  );
}
