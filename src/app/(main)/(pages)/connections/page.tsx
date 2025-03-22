import MenuOptions from "@/components/sidebar/main";
import { CONNECTIONS } from "@/lib/constants";
import React from "react";
import ConnectionCard from "./_components/connection-card";
import { currentUser } from "@clerk/nextjs/server";
import { onDiscordConnect } from "./_actions/discord-connect";
import { onNotionConnect } from "./_actions/notion_connect";
import { onSlackConnect } from "./_actions/slack_connect";
import { getUserData } from "./_actions/get-user-data";

type Props = {
  searchParam?: { [key: string]: string | undefined }
};

const ConnectionsPage = async ({searchParam = {}}: Props) => {

  await searchParam;
  const {
    webhook_id,
    webhook_name,
    webhook_url,
    guild_id,
    guild_name,
    channel_id,
    access_token,
    workspace_name,
    workspace_icon,
    workspace_id,
    database_id,
    app_id,
    authed_user_id,
    authed_user_token,
    slack_access_token,
    bot_user_id,
    team_id,
    team_name,
  } = searchParam ?? {
    webhook_id: "",
    webhook_name: "",
    webhook_url: "",
    guild_id: "",
    guild_name: "",
    channel_id: "",
    access_token: "",
    workspace_name: "",
    workspace_icon: "",
    workspace_id: "",
    database_id: "",
    app_id: "",
    authed_user_id: "",
    authed_user_token: "",
    slack_access_token: "",
    bot_user_id: "",
    team_id: "",
    team_name: "",
  };

  const user = await currentUser();
  if (!user) return null;

  const onUserConnections = async () => {
    console.log(database_id);
    await onDiscordConnect(
      channel_id!,
      webhook_id!,
      webhook_name!,
      webhook_url!,
      user.id,
      guild_name!,
      guild_id!
    );
    await onNotionConnect(
      access_token!,
      workspace_id!,
      workspace_icon!,
      workspace_name!,
      database_id!,
      user.id
    );

    await onSlackConnect(
      app_id!,
      authed_user_id!,
      authed_user_token!,
      slack_access_token!,
      bot_user_id!,
      team_id!,
      team_name!,
      user.id
    );

    const connections: any = {};

    const user_info = await getUserData(user.id);

    //get user info with all connections
    user_info?.connections.map((connection) => {
      connections[connection.type] = true;
      return (connections[connection.type] = true);
    });

    // Google drive connection will always be true
    // as it is given access during the login process
    return { ...connections, "Google drive":true };
  };

  const connections = await onUserConnections();

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
              connected={connections}
              key={connection.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
