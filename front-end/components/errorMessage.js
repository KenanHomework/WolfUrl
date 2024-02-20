import SparklesIcon from "@/icons/sparklesIcon";
import ErrorIcon from "@/icons/errorIcon";

export default function ErrorMessage({ message, version }) {
  return (
    <div
      className={
        "flex items-center gap-2 p-2 rounded-md  border-[1px] border-[#e4e4e7] select-none shadow-none hover:shadow smooth-animation"
      }
    >
      <ErrorIcon size={24} color={"red"} />
      <p>{message}</p>
    </div>
  );
}
