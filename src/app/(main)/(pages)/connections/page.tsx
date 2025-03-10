import MenuOptions from "@/components/sidebar/main";
import { CONNECTIONS } from "@/lib/constants";
import { div } from "framer-motion/client";
import React from "react";
import ConnectionCard from "./_components/connection-card";

type Props = {};

const ConnectionsPage = (props: Props) => {
  return (
    <div className="w-full flex flex-col gap-4 relative ">
      <h1 className=" text-3xl sticky top-0 z-[10] p-4 bg-background/50 backdrop-blur-lg flex items-center border-b ">
        Connections
      </h1>
      <div className="relative w-full flex flex-col gap-4">
        <section className="flex flex-col gap-4 p-6 text-muted-foreground">
          Connect all your apps directly from here. <br />
          You may be asked to connect these apps frequently to refresh
          verification.
        </section>
        <div className="flex flex-wrap gap-4 justify-center">
          {CONNECTIONS.map((connection) => (
            <ConnectionCard
              type={connection.title}
              icon={connection.image}
              title={connection.title}
              description={connection.description}
              connected={false}
              key={connection.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
