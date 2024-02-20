"use client";

import ShortLinkView from "@/components/short-link-view";
import { Button, Divider, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getLinks } from "@/services/url";
import PlusIcon from "@/icons/plusIcon";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";

export default function Page() {
  const router = useRouter();

  const [links, setLinks] = useState(null);

  useEffect(() => {
    getLinks()
      .then((links) => {
        setLinks(links);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className={"w-full h-full flex flex-col items-start justify-start pt-10"}
    >
      <div className={"flex items-center justify-between w-full"}>
        <h1 className={"font-bold text-3xl"}>Links</h1>
        <Button
          onClick={() => {
            router.push("/");
          }}
          color={"primary"}
        >
          <PlusIcon color={"white"} width={24} height={24} />
        </Button>
      </div>
      <Divider className={"mt-2"} />
      <div
        className={
          "w-full h-full flex flex-col gap-2 py-6 px-1 overflow-y-scroll box-border"
        }
      >
        {!links ? (
          <Spinner label="Loading..." color="primary" />
        ) : links.length > 0 ? (
          links.map((link) => <ShortLinkView key={link.id} data={link} />)
        ) : (
          <div
            className={"w-full flex flex-col justify-center items-center gap-5"}
          >
            <Image
              src={"https://app.bitly.com/s/bbt2/images/links-list-empty.png"}
              alt={"Illustration"}
              width={400}
              height={400}
            />
            <div className={"flex justify-center items-center flex-col gap-3"}>
              <h1 className={"text-4xl font-extrabold"}>
                More clicks are just a link away
              </h1>
              <h2 className={"text-xl text-gray-600 text-center"}>
                Shorten long links and get attention by customizing what they
                say. <br />
                No more /3yqawYa, more bit.ly/brands-bitly.
              </h2>
            </div>
            <Button
              onClick={() => {
                router.push("/");
              }}
              color={"primary"}
            >
              Create a short link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
