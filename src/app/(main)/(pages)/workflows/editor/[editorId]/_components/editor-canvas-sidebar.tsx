import {
  EditorCanvasCardType,
  EditorCanvasTypes,
  EditorNodeType,
} from "@/lib/types";
import { useNodeConnections } from "@/provider/connections-provider";
import { useEditor } from "@/provider/editor-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { EditorCanvasDefaultCardTypes } from "@/lib/constants";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper";
import { onDragStart } from "@/lib/editor-utils";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  nodes: EditorNodeType[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor();

  const { nodeConnection } = useNodeConnections();

  // useEffect(()=>{
  //   console.log("Selected element : ",state.editor.selectedNode.data.title);
  //   console.log(EditorCanvasDefaultCardTypes);

    
  // },[state.editor.selectedNode])

  return (
    <div className="text-white flex justify-center items-center">
      <Tabs
        defaultValue="actions"
        className="h-screen w-full flex items-center"
      >
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent
          value="actions"
          className="p-2 overflow-scroll no-scrollbar"
        >
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === "Trigger") ||
                (nodes.length && cardType.type === "Action")
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="cursor-grab "
                onDragStart={(event) => {
                  console.log("Dragging:", cardKey, "Type:", cardValue.type);
                  onDragStart(event, cardKey as EditorCanvasCardType["type"]);
                }}
              >
                <CardHeader>
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle>{cardKey}</CardTitle>
                  <CardDescription>{cardValue.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-2 text-center text-2xl font-bold">
            {state.editor.selectedNode.data.title}
          </div>

          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorCanvasSidebar;
