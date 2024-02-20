export default function LayoutContainer({ children }) {
  return (
    <div className={"w-full h-full flex justify-center"}>
      <div className={"max-w-[1200px] h-full box-border sm:px-4 p-0 w-full"}>
        {children}
      </div>
    </div>
  );
}
