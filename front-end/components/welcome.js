export default function Welcome() {
  return (
    <div className={"w-full text-center flex flex-col gap-3"}>
      <h1 className={"text-5xl font-extrabold"}>
        Make every <span className={"text-blue-600"}>connection</span> count
      </h1>
      <p className={"text-2xl text-gray-600"}>
        Create short links.Share them anywhere. Track what’s working, and what’s
        not.
        <br /> All inside the{" "}
        <span className={"font-bold"}>Wolf Url Connections Platform</span>.
      </p>
    </div>
  );
}
