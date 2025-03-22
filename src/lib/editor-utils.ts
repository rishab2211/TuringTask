import { ConnectionProviderProps } from "@/provider/connections-provider";
import { EditorCanvasCardType } from "./types";
import { ChangeEvent } from "react";
import { EditorState } from "@/provider/editor-provider";
import { getDiscordConnectionUrl } from "@/app/(main)/(pages)/connections/_actions/discord-connect";
import { getNotionConnection, getNotionDatabase } from "@/app/(main)/(pages)/connections/_actions/notion_connect";
import { getSlackConnection } from "@/app/(main)/(pages)/connections/_actions/slack_connect";


export const onDragStart = (event: any, nodeType: EditorCanvasCardType["type"]) => {
    event.dataTransfer.setData("application/xyflow/react", nodeType);
    event.dataTransfer.effectAllowed = "move";
}

export const onSlackContent = (nodeConnection: ConnectionProviderProps,
    event: ChangeEvent<HTMLInputElement>
) => {
    nodeConnection.setSlackNode((prev: any) => ({
        ...prev,
        content: event.target.value
    }))
}

export const onDiscordContent = (nodeConnection: ConnectionProviderProps, event: ChangeEvent<HTMLInputElement>) => {
    nodeConnection.setDiscordNode((prev: any) => ({
        ...prev,
        content: event.target.value
    }))
}

export const onAddTemplateSlack = (nodeConnection: ConnectionProviderProps, template: string) => {
    nodeConnection.setSlackNode((prev: any) => ({
        ...prev,
        content: `${prev.content} ${template}`
    }))
}


export const onAddTemplateDiscord = (nodeConnection: ConnectionProviderProps, template: string) => {
    nodeConnection.setDiscordNode((prev: any) => ({
        ...prev,
        content: `${prev.content} ${template}`
    }))
}

export const onAddTemplate = (nodeConnection: ConnectionProviderProps,
    title: string,
    template: string
) => {
    if (title === "Slack") {
        onAddTemplateSlack(nodeConnection, template)
    } else if (title === "Discord") {
        onAddTemplateDiscord(nodeConnection, template)
    }
}

export const onContentChange = (nodeConnection: ConnectionProviderProps,
    nodeType: string,
    event: React.ChangeEvent<HTMLInputElement>
) => {

    if (nodeType === "Slack") {
        onSlackContent(nodeConnection, event)
    } else if (nodeType === "Discord") {
        onDiscordContent(nodeConnection, event)
    }

}


export const onConnection = async (
    nodeConnection: ConnectionProviderProps,
    googleFile: any,
    editorState: EditorState) => {
    if (editorState.editor.selectedNode.data.title == "Discord") {
        const connection = await getDiscordConnectionUrl();

        if (connection!) {
            nodeConnection.setDiscordNode({
                webhookUrl: connection.url,
                content: "",
                webhookName: connection.name,
                guildName: connection.guildName,
            })
        }
    }

    if (editorState.editor.selectedNode.data.title == "Notion") {
        const connection = await getNotionConnection();

        if (connection!) {
            nodeConnection.setNotionNode({
                accessToken: connection.accessToken,
                databaseId: connection.databaseId,
                workspaceName: connection.workspaceName,
                content: {
                    name: googleFile.name,
                    kind: googleFile.kind,
                    type: googleFile.mimeType
                }
            })

            if (nodeConnection.notionNode.databaseId !== "") {
                const response = await getNotionDatabase(
                    nodeConnection.notionNode.databaseId,
                    nodeConnection.notionNode.accessToken
                )
            }
        }
    }


    if (editorState.editor.selectedNode.data.title == "Slack") {
        const connection = await getSlackConnection();

        if (connection!) {
            nodeConnection.setSlackNode({
                appId: connection.appId,
                authedUserId: connection.authedUserId,
                authedUserToken: connection.authedUserToken,
                slackAccessToken: connection.slackAccessToken,
                botUserId: connection.botUserId,
                teamId: connection.teamId,
                teamName: connection.teamName,
                userId: connection.userId,
                content: '',
            })


        }
    }

}