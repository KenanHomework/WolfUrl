import { Avatar, Button, Link } from "@nextui-org/react";
import CopyIcon from "@/icons/copyIcon";
import { useEffect, useState } from "react";

export default function ShortLinkView({ data }) {
  const { label, backHalf, destination } = data;

  const [copied, setCopied] = useState(false);

  const baseUrl = getBaseUrl(destination);

  const favIconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${baseUrl}&size=32`;

  function getBaseUrl(url) {
    let urlObject = new URL(url);

    return urlObject.protocol + "//" + urlObject.hostname + "/";
  }

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <div
      className={
        "w-full bg-[#ffffff] p-6 rounded-lg flex items-start justify-between"
      }
    >
      <div className={"flex items-start gap-5"}>
        <Avatar
          src={favIconUrl}
          alt={"fav icon"}
          width={32}
          height={32}
          isBordered
        />
        <div className={"flex flex-col gap-1"}>
          <h1 className={"font-semibold text-xl"}>{label}</h1>
          <Link
            href={backHalf}
            target={"_blank"}
            className={"font-semibold text-base"}
          >
            /{backHalf}
          </Link>
          <a target={"_blank"} href={destination}>
            {destination}
          </a>
        </div>
      </div>

      <Button
        color={"default"}
        radius={"sm"}
        size={"md"}
        startContent={<CopyIcon height={24} width={24} />}
        onClick={() => {
          navigator.clipboard.writeText(backHalf);
          setCopied(true);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
