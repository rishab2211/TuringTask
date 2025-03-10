"use client";
import Image from "next/image";
import Link from "next/link";
import { menuOptions } from "@/lib/constants";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import {
  DatabaseIcon,
  GitBranchIcon,
  LucideMousePointerClick,
} from "lucide-react";


type Props = {};

const MenuOptions = (props: Props) => {
  return (
    <nav className="dark:bg-black/80 h-screen flex flex-col items-center gap-10 py-6 px-2 ">
      <div className=" flex items-center justify-center flex-col gaap-8 ">
        <Link href={"/"}>
          <Image src={"/workflow.png"} alt="icon" width={32} height={32} />
        </Link>
        <AnimatedTooltip items={menuOptions} />
        <br />
        <div className="flex items-center flex-col gap-9 overflow-auto no-scrollbar dark:bg-[#353346]/40 py-4 px-2 rounded-full h-56 border-[1px]  ">
          <div className=" flex flex-col relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] ">
            <LucideMousePointerClick size={18} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className=" flex flex-col relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] ">
            <GitBranchIcon size={18} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className=" flex flex-col relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] ">
            <DatabaseIcon size={18} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
          <div className=" flex flex-col relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] ">
            <GitBranchIcon size={18} />
            <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuOptions;
