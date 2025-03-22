"use client";

import { EditorCanvasCardType, EditorNodeType } from "@/lib/types";
import { useEditor } from "@/provider/editor-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import EditorCanvasCardSingle from "./editor-canvas-card-single";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  addEdge,
  applyNodeChanges,
  NodeChange,
  ReactFlow,
  Connection,
  Edge,
  Controls,
  MiniMap,
  ReactFlowInstance,
  Background,
} from "@xyflow/react";
import { toast } from "sonner";
import { v4 } from "uuid";
import { EditorCanvasDefaultCardTypes } from "@/lib/constants";
import { Loader2Icon } from "lucide-react";
import FlowInstance from "./flow-instance";
import EditorCanvasSidebar from "./editor-canvas-sidebar";

const initialNodes: EditorNodeType[] = [];
const initialEdges: Edge[] = [];

const EditorCanvas = () => {
  const { dispatch, state } = useEditor();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isWorkFlowLoading, setIsWorkFlowLoading] = useState<boolean>(false);

  const nodeTypes = useMemo(
    () => ({
      Action: EditorCanvasCardSingle,
      Trigger: EditorCanvasCardSingle,
      Email: EditorCanvasCardSingle,
      Condition: EditorCanvasCardSingle,
      AI: EditorCanvasCardSingle,
      Slack: EditorCanvasCardSingle,
      "Google drive": EditorCanvasCardSingle,
      Notion: EditorCanvasCardSingle,
      Discord: EditorCanvasCardSingle,
      "Custom Webhook": EditorCanvasCardSingle,
      "Google Calendar": EditorCanvasCardSingle,
      Wait: EditorCanvasCardSingle,
    }),
    []
  );

  // Handle node changes (dragging, resizing, deleting)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as EditorNodeType[]);
    },
    [setNodes]
  );

  // Handle edge connections
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => [...eds, { ...params, id: v4() }]);
  }, []);

  // Handle drag over to allow dropping nodes
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle dropping nodes onto the canvas
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type: EditorCanvasCardType["type"] = event.dataTransfer.getData(
        "application/xyflow/react"
      ) as EditorCanvasCardType["type"];

      if (!type) return;

      const triggerAlreadyExists = state.editor.elements.some(
        (node) => node.type === "Trigger"
      );

      if (type === "Trigger" && triggerAlreadyExists) {
        toast("Only one trigger can be added to automations at the moment");
        return;
      }

      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: EditorNodeType = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: EditorCanvasDefaultCardTypes[type]?.description || "",
          completed: false,
          current: false,
          metadata: {},
          type,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance, state]
  );

  // Handle clicking on the canvas (deselect nodes)
  const handleClickCanvas = () => {
    dispatch({
      type: "SELECTED_ELEMENT",
      payload: {
        element: {
          data: {
            completed: false,
            current: false,
            description: "",
            metadata: {},
            title: "",
            type: "Trigger",
          },
          id: "",
          position: { x: 0, y: 0 },
          type: "Trigger",
        },
      },
    });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: { edges, elements: nodes } });
  }, [nodes, edges]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={70}>
        <div className="w-full h-full flex justify-center items-center pb-[70px] relative">
          {isWorkFlowLoading ? (
            <Loader2Icon className="animate-spin transition-all" size={40} />
          ) : (
            <ReactFlow
              className="w-full h-full"
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onClick={handleClickCanvas}
              onInit={setReactFlowInstance}
              fitView
              nodeTypes={nodeTypes}
            >
              <Controls className="text-black" position="top-left" />
              <Background size={2} gap={12} />
              <MiniMap
                position="bottom-left"
                className="!bg-background"
                zoomable
                pannable
              />
            </ReactFlow>
          )}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} className="border-l relative sm:block">
        {isWorkFlowLoading ? (
          <Loader2Icon className="animate-spin" size={30} />
        ) : (
          <FlowInstance nodes={nodes} edges={edges}>
            <EditorCanvasSidebar nodes={nodes} />
          </FlowInstance>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default EditorCanvas;
