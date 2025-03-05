import { BookOpen, Headphones, Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Infobar = () => {
  return (
    <div className=" flex flex-row justify-end gap-6 items-center p-4 w-full dark:bg-black ">
      <span className="flex items-center bg-muted px-4 rounded-full">
        <Search />
        <Input
          placeholder="Quick search"
          className="border-none w-full bg-transparent outline-none focus:ring-0 focus:border-none"
        />
      </span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Headphones />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <BookOpen />
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Infobar;
