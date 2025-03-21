import { ConnectionProviderProps } from "@/provider/connections-provider";
import { EditorCanvasCardType } from "./types";
import { ChangeEvent } from "react";


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
    if (title==="Slack"){
        onAddTemplateSlack(nodeConnection, template)
    }else if(title === "Discord"){
        onAddTemplateDiscord(nodeConnection,template)
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