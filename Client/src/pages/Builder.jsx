import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useReactFlow,
  ReactFlowProvider
} from "reactflow";

import Sidebar from "../components/Sidebar";
import UserInputNode from "../components/nodes/UserInputNode";
import LLMNode from "../components/nodes/LLMNode";
import OutputNode from "../components/nodes/OutputNode";

const nodeTypes = {
  userInput: UserInputNode,
  llm: LLMNode,
  output: OutputNode
};

let id = 0;
const getId = () => `node_${id++}`;

function BuilderContent() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const { project } = useReactFlow();

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/reactflow"
      );

      if (!type) return;

      const position = project({
        x: event.clientX,
        y: event.clientY
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: {}
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project]
  );

  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          onConnect={(params) =>
            setEdges((eds) => addEdge(params, eds))
          }
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function Builder() {
  return (
    <ReactFlowProvider>
      <BuilderContent />
    </ReactFlowProvider>
  );
}
