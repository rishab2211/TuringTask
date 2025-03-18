import { EditorCanvasCardType } from "@/lib/types";
import { useEditor } from "@/provider/editor-provider";
import React, { useMemo } from "react";
import { Position, ReactFlow, useNodeId } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper";
import CustomHandle from "./custom-handle";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
type Props = {};

const EditorCanvasCardSingle = ({ data }: { data: EditorCanvasCardType }) => {
  const { dispatch, state } = useEditor();
  const nodeId = useNodeId();
  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type={data.type} />;
  }, [data]);
  return (
    <div>
      {data.type !== "Trigger" && data.type !== "Google drive" && (
        <CustomHandle
          type="target"
          position={Position.Top}
          style={{ zIndex: 100 }}
        />
      )}
      <Card
        onClick={(e) => {
          e.stopPropagation();
          const val = state.editor.elements.find((n) => n.id === nodeId);
          if (val) {
            dispatch({
              type: "SELECTED_ELEMENT",
              payload: {
                element: val,
              },
            });
          }
        }}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <div>{logo}</div>
          <div>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>
              <p className="text-xs text-muted-foreground/50">
                <b>ID:</b>
                {nodeId}
              </p>
              <p>{data.description}</p>
            </CardDescription>
          </div>
        </CardHeader>
        <Badge variant={"secondary"} className="absolute right-2 top-2">
          {data.type}
        </Badge>
      </Card>
      <CustomHandle
      type="source"
      position={Position.Bottom}
      id={"a"}

      />
    </div>
  );
};

export default EditorCanvasCardSingle;
