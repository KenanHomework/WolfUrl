"use client";

import { useEffect, useState } from "react";
import { getLink } from "@/services/url";
import { Button, divider, Link, Spinner } from "@nextui-org/react";

export default function Page({ params }) {
  const backHalf = params.back_half;
  const [isLoading, setIsLoading] = useState(true);
  const [link, setLink] = useState(null);

  useEffect(() => {
    getLink(backHalf)
      .then((link) => {
        setLink(link);
      })
      .catch(() => {
        setLink(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      className={
        "w-full h-full flex flex-col justify-center items-center gap-5"
      }
    >
      <h1 className={"text-4xl font-extrabold"}>
        {!isLoading && !link
          ? "This link or QR Code has been deactivated"
          : "More clicks are just a link away"}
      </h1>
      {isLoading ? (
        <Spinner label="Loading..." color="primary" />
      ) : link ? (
        <Button
          href={link.destination}
          target={"_blank"}
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
        >
          Go to link
        </Button>
      ) : (
        <div>
          <p>
            Use <Link href={"/"}>WolfUrl</Link> to create short links.
          </p>
        </div>
      )}
    </div>
  );
}
