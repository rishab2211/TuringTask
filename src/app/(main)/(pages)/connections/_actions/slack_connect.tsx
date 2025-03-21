"use server"
import { db } from "@/lib/db";
import { Option } from "@/store";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export const onSlackConnect = async (
  app_id: string,
  authed_user_id: string,
  authed_user_token: string,
  slack_access_token: string,
  bot_user_id: string,
  team_id: string,
  team_name: string,
  user_id: string
) => {
  if (!slack_access_token) {
    return;
  }

  const slackConnection = await db.slack.findFirst({
    where: {
      slackAccessToken: slack_access_token,
    },
    include: { connections: true },
  });

  if (!slackConnection) {
    await db.slack.create({
      data: {
        userId: user_id,
        appId: app_id,
        authedUserId: authed_user_id,
        slackAccessToken: slack_access_token,
        authedUserToken: authed_user_token,
        botUserId: bot_user_id,
        teamId: team_id,
        teamName: team_name,
        connections: {
          create: {
            userId: user_id,
            type: "Slack",
          },
        },
      },
    });
  }
};

export const getSlackConnection = async () => {
  const user = await currentUser();
  if (user) {
    const connection = await db.slack.findFirst({
      where: { userId: user.id },
    });

    return connection;
  } else {
    return null;
  }
};

export const listBotChannels = async (
  slackAccessToken: string
): Promise<Option[]> => {
  const url = `https://slack.com/api/conversation.list?${new URLSearchParams({
    types: "public_channel,private_channel",
    limit: "200",
  })}`;

  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${slackAccessToken}` },
    });

    if (!data.ok) {
      throw new Error(data.error);
    }

    if (!data?.channels?.length) {
      return [];
    }

    return data.channels
      .filter((ch: any) => ch.is_member)
      .map((ch: any) => {
        return { label: ch.name, value: ch.id };
      });
  } catch (err: any) {
    console.log("Error listing bot channels : ", err);
    throw err;
  }
};


const postMessageInSlackChannel = async (
  slackAccessToken: string,
  slackChannel: string,
  content: string
): Promise<void> => {
  try {
    await axios.post(
      'https://slack.com/api/chat.postMessage',
      { channel: slackChannel, text: content },
      {
        headers: {
          Authorization: `Bearer ${slackAccessToken}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
    console.log(`Message posted successfully to channel ID: ${slackChannel}`)
  } catch (error: any) {
    console.error(
      `Error posting message to Slack channel ${slackChannel}:`,
      error?.response?.data || error.message
    )
  }
}


// Wrapper function to post messages to multiple Slack channels
export const postMessageToSlack = async (
  slackAccessToken: string,
  selectedSlackChannels: Option[],
  content: string
): Promise<{ message: string }> => {
  if (!content) return { message: 'Content is empty' }
  if (!selectedSlackChannels?.length) return { message: 'Channel not selected' }

  try {
    selectedSlackChannels
      .map((channel) => channel?.value)
      .forEach((channel) => {
        postMessageInSlackChannel(slackAccessToken, channel, content)
      })
  } catch (error) {
    return { message: 'Message could not be sent to Slack' }
  }

  return { message: 'Success' }
}