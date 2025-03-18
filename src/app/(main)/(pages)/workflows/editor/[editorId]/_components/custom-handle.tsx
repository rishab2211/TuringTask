import { useEditor } from "@/provider/editor-provider";
import { Handle, HandleProps, useStore } from "@xyflow/react";
import { source } from "framer-motion/client";
import React, { CSSProperties } from "react";

type Props = HandleProps & { style?: CSSProperties };

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props: Props) => {
  const { state } = useEditor();
  const { nodeInternals, edges } = useStore(selector);

  const isValidConnection = (e: any) => {
    const targetFromHandleInState = state.editor.edges.filter(
      (edge) => edge.target === e.target
    ).length;

    const sourcesFromHandleInState = state.editor.edges.filter(
      (edge) => edge.source == e.source
    ).length;

    const sourceNode = state.editor.elements.find(
      (node) => node.id === edges.source
    );

    if (targetFromHandleInState === 1) {
      return false;
    }
    if (sourceNode?.type === "Condition") {
      return true;
    }
    if (sourcesFromHandleInState < 1) {
      return true;
    }
    return false;
  };

  return <Handle {...props} isValidConnection={isValidConnection} className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800 "/>;
};

export default CustomHandle;
