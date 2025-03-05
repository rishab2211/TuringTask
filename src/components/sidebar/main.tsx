"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constants";
import { ul } from "framer-motion/client";
import { AnimatedTooltip } from "../ui/animated-tooltip";

type Props = {};

const MenuOptions = (props: Props) => {
  const pathname = usePathname();

  return (
    <nav className="dark:bg-black/80 h-screen flex flex-col items-center gap-10 py-6 px-2 ">
      <div className=" flex items-center justify-center flex-col gaap-8 ">
        <Link href={"/"}>
          <Image src={"/workflow.png"} alt="icon" width={30} height={30} />
        </Link>
        <AnimatedTooltip items={menuOptions} />
      </div>
    </nav>
    
  );
};

export default MenuOptions;
