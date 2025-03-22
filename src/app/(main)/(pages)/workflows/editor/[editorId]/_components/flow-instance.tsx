import { Button } from "@/components/ui/button";
import { useNodeConnections } from "@/provider/connections-provider";
import { usePathname } from "next/navigation";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  onCreateNodesEdges,
  onFlowPublish,
} from "../_actions/workflow-connections";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
  edges: any[];
  nodes: any[];
};

const FlowInstance = ({ children, nodes, edges }: Props) => {
  const pathname = usePathname();
  const [Flow, setFlow] = useState([]);
  const { nodeConnection } = useNodeConnections();

  const onFlowAutomation = useCallback(async () => {
    const flow = await onCreateNodesEdges(
      pathname.split("/").pop() as string,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(Flow)
    );
  }, []);

  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(pathname.split("/").pop()!, true);
    if (response) toast.message(JSON.stringify(response));
  }, []);

  const onAutomateFlow = async () => {
    const flows: any = [];
    const connectionEdges = edges.map((edge) => edge.target);
    connectionEdges.map((target) =>
      nodes.forEach((node) => {
        if (node.id === target) {
          flows.push(node.type);
        }
      })
    );
    setFlow(flows);
  };

  useEffect(() => {
    onAutomateFlow();
  }, [edges]);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-end gap-3 p-4">
        <Button onClick={onFlowAutomation} disabled={Flow.length < 1}>
          Save
        </Button>
        <Button disabled={Flow.length < 1} onClick={onPublishWorkflow}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  );
};

export default FlowInstance;
