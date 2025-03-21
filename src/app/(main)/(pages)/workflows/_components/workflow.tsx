import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { onFlowPublish } from "../editor/[editorId]/_actions/workflow-connections";

type Props = {
  title: string;
  description: string;
  id: string;
  published: boolean;
};

const imgs = ["/googleDrive.svg", "/notion.svg", "/discord.svg"];

const Workflow = ({ title, description, id, published }: Props) => {
  const onPublishFlow = async (event: any) => {
    const response = await onFlowPublish(
      id,
      event.target.ariaChecked === "false"
    );
    if (response) toast.message(JSON.stringify(response));
  };

  return (
    <div className="flex items-center gap-8 mx-3 border-2 px-6 py-4 rounded-lg w-fit">
      <div className="flex flex-col">
        <div className="flex">
          {imgs.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`logo ${img}`}
              width={28}
              height={28}
            />
          ))}
        </div>
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </div>
      <Switch 
      id="publish"
      onClick={onPublishFlow}
      defaultChecked={published!}
      />
    </div>
  );
};

export default Workflow;
