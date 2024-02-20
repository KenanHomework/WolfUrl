import classNames from "classnames";

export default function GeneralButton({ icon, handleClick, isColored, label }) {
  return (
    <button
      className={classNames({
        "py-2 px-4 group smooth-animation": true,
        "text-blue-700": isColored,
        "hover:text-blue-700": !isColored,
      })}
      onClick={() => {
        handleClick();
      }}
    >
      <p className={""}>{label}</p>
    </button>
  );
}
