import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactFlow, {
  addEdge,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useStore,
  ConnectionLineType,
  BezierEdge,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../components/Sidebar";
import InputNode from "../components/nodes/InputNode";
import LLMNode from "../components/nodes/LLMNode";
import KBNode from "../components/nodes/KnowledgeBaseNode";
import OutputNode from "../components/nodes/OutputNode";
import { useStack } from "../context/StackContext";


const nodeTypes = {
  inputNode: InputNode,
  llmNode: LLMNode,
  kbNode: KBNode,
  outputNode: OutputNode,
};


const edgeTypes = {
  bezier: BezierEdge,
};

/* ---------------- CUSTOM CONTROLS ---------------- */
function CustomControls() {
  const { zoomIn, zoomOut, fitView, setViewport } = useReactFlow();
  const zoom = useStore((state) => state.transform[2]);

  const handleZoomChange = (e) => {
    const newZoom = Number(e.target.value);
    setViewport({ zoom: newZoom }, { duration: 200 });
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center overflow-hidden">
      <button onClick={zoomIn} className="px-3 py-2 hover:bg-gray-100 text-lg">+</button>
      <div className="w-px h-6 bg-gray-200" />
      <button onClick={zoomOut} className="px-3 py-2 hover:bg-gray-100 text-lg">−</button>
      <div className="w-px h-6 bg-gray-200" />
      <button onClick={fitView} className="px-3 py-2 hover:bg-gray-100">⤢</button>
      <div className="w-px h-6 bg-gray-200" />
      <select
        value={Number(zoom.toFixed(2))}
        onChange={handleZoomChange}
        className="px-3 py-2 text-sm bg-transparent focus:outline-none cursor-pointer"
      >
        <option value={0.5}>50%</option>
        <option value={0.75}>75%</option>
        <option value={1}>100%</option>
        <option value={1.5}>150%</option>
      </select>
    </div>
  );
}


export default function Builder() {
  const [searchParams] = useSearchParams();
  const stackId = searchParams.get("stackId");
  const { loadStack } = useStack();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (stackId) loadStack(stackId);
  }, [stackId, loadStack]);


  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "bezier",
            curvature: 0.45,
          },
          eds
        )
      ),
    []
  );

  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("nodeType");

    const position = {
      x: event.clientX - 320,
      y: event.clientY - 120,
    };

    setNodes((nds) =>
      nds.concat({
        id: `${Date.now()}`,
        type,
        position,
        data: {},
      })
    );
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="flex flex-col sm:flex-row h-full overflow-hidden">
      <Sidebar />

      <div
        className="flex-1 bg-[#F1F5F9] w-full min-h-0 relative"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}              
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.Bezier} 
          defaultEdgeOptions={{
            type: "bezier",
            curvature: 0.45,
          }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <MiniMap className="!bottom-2 !right-2 !w-24 !h-20 sm:!w-32 sm:!h-24" />
          <Background gap={16} />
          <CustomControls />
        </ReactFlow>
      </div>
    </div>
  );
}
