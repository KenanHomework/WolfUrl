import SparklesIcon from "@/icons/sparklesIcon";

export default function AlertBrand({ message }) {
  return (
    <div className="w-full p-4 rounded-xl bg-[#ecfdff] text-[#007c8c] flex items-center gap-2 ">
      <SparklesIcon width={22} height={22} />
      <p className="text-lg">{message}</p>
    </div>
  );
}
