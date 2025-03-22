"use client";
import { Button } from "@/components/ui/button";
import { ConnectionType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  type: ConnectionType;
  icon?: string;
  title: ConnectionType;
  description: string;
  callback?: () => void;
  connected: {} & any;
};

const ConnectionCard: React.FC<Props> = ({
  type,
  icon,
  title,
  description,
  callback,
  connected,
}) => {

  return (
    <div className="border m-3  p-4 w-max-[450px]  rounded-md shadow-md flex flex-col items-center">
      <Image src={icon as string} alt={title} width={40} height={40} />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>

      <div className="flex flex-col items-center gap-2 p-4">
        {connected[type] ? (
          <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all text-white">
            Connected
          </div>
        ) : (
          <Link
            href={
              title == "Discord"
                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                : title == "Notion"
                ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
                : title == "Slack"
                ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
                : "#"
            }
            className=" rounded-lg bg-primary hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all p-2 font-bold text-primary-foreground"
          >
            Connect
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
