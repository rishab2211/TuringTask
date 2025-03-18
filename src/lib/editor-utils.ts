import { EditorCanvasCardType } from "./types";

export const onDragStart = (event: any, nodeType: EditorCanvasCardType["type"]) => {
    event.dataTransfer.setData("application/xyflow/react", nodeType);
    event.dataTransfer.effectAllowed = "move";
}