import { ConnectionProviderProps } from "@/provider/connections-provider";
import { z } from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("Required"),
  name: z.string().min(1, "Required"),
});

export const WorkflowSchema = z.object({
  title : z.string().min(2,"Required"),
  description : z.string().min(1, "Required")
})

export type ConnectionType = 'Google drive' | 'Notion' | 'Slack' | 'Discord'



export type Connection={
  title: ConnectionType,
    description:string,
    image: string,
    connectionKey: keyof ConnectionProviderProps,
    accessTokenKey?: string,
    alwaysTrue?: boolean,
    slackSpecial?: boolean,
}