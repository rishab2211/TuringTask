"use server";

import { db } from "@/lib/db";

export const onNotionConnect = async (
  access_token: string,
  workspace_id: string,
  workspace_icon: string,
  workspace_name: string,
  database_id: string,
  id: string
) => {
  //if access token exists
  if (access_token) {
    //check if notion is connected
    const notion = await db.notion.findFirst({
      where: {
        accessToken: access_token,
      },
      include: {
        connections: {
          select: {
            type: true,
          },
        },
      },
    });

    if (!notion) {
      //create connection
      await db.notion.create({
        data: {
          userId: id,
          workspaceIcon: workspace_icon,
          accessToken: access_token,
          workspaceId: workspace_id,
          workspaceName: workspace_name,
          databaseId: database_id,
          connections: {
            create: {
              userId: id,
              type: "Notion",
            },
          },
        },
      });
    }
  }
};
