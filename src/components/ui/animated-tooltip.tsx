"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    Component: React.FC<any>;
    href: string;
  }[];
}) => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => (
        <Link href={item.href} key={idx}>
          <div
            className=" mt-5 p-2.5 rounded-lg  relative group "
            key={item.name}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, x: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-12 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-white z-50 px-4 py-2"
                >
                  <div className="absolute inset-x-10 z-30 w-[30%] -bottom-px bg-gradient-to-r from-transparent shadow-2xl via-emerald-600 to-transparent h-px " />
                  <div className="absolute left-10 w-[50%] z-30 -bottom-px bg-gradient-to-r from-transparent via-blue-600 to-transparent h-px " />
                  <div className="font-bold text-black relative z-30 text-base">
                    {item.name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {<item.Component selected={pathname == item.href ? true : false} />}
          </div>
        </Link>
      ))}
    </>
  );
};
