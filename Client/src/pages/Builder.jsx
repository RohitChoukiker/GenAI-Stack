import { useCallback, useEffect, useState } from "react";
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
import Header from "../components/Header";
import InputNode from "../components/nodes/InputNode";
import LLMNode from "../components/nodes/LLMNode";
import KBNode from "../components/nodes/KnowledgeBaseNode";
import OutputNode from "../components/nodes/OutputNode";
import { useStack } from "../context/StackContext";
import { BASE_URL } from "../api/stackApi";
import ChatModal from "../components/ChatModal";


const nodeTypes = {
  inputNode: InputNode,
  llmNode: LLMNode,
  kbNode: KBNode,
  outputNode: OutputNode,
};

const edgeTypes = {
  bezier: BezierEdge,
};


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
  const [showChat, setShowChat] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]); 
  const handleNodeDataChange = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  };

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

 
  useEffect(() => {
    if (showChat && stackId) {
      setChatLoading(true);
      setChatMessages([]); 
      fetch(`${BASE_URL}/stacks/${stackId}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '' })
      })
        .then(res => res.json())
        .then(data => {
          
          setChatMessages([{ from: 'bot', text: 'Hi! How can I help you with your stack?' }]);
        })
        .catch(err => {
          setChatMessages([{ from: 'bot', text: 'Failed to start chat.' }]);
        })
        .finally(() => setChatLoading(false));
    }
  }, [showChat, stackId]);

  // Send message handler
  const sendChatMessage = async () => {
    if (!chatInput.trim() || !stackId) return;
    const userMsg = chatInput.trim();
    setChatMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/stacks/${stackId}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg })
      });
      const data = await res.json();
      setChatMessages((msgs) => [...msgs, { from: 'bot', text: data.response || 'No response.' }]);
    } catch (err) {
      setChatMessages((msgs) => [...msgs, { from: 'bot', text: 'Error: Could not get response.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header nodes={nodes} edges={edges} stackId={stackId} />

      <div className="flex flex-row h-full">
        <Sidebar />

        <div
          className="flex-1 bg-[#F1F5F9] w-full min-h-0 relative"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                onChange: (newData) =>
                  handleNodeDataChange(node.id, newData),
              },
            }))}
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

   
          <ChatModal
            show={showChat}
            onClose={() => setShowChat(false)}
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            sendChatMessage={sendChatMessage}
            chatLoading={chatLoading}
          />

          <div className="absolute bottom-26 right-6 flex flex-col gap-4 z-50">
            <button
              className="w-14 h-14 cursor-pointer rounded-full bg-[#16A34A4D] hover:bg-green-700 flex items-center justify-center shadow-lg"
              onClick={() => {
                console.log("Run stack");
              }}
            >
              <img src="/images/play.png" alt="Run" className="w-6 h-6 " />
            </button>

            <button
              className="w-14 h-14 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg text-white group relative"
              onClick={() => setShowChat(true)}
            >
              <img src="/images/chat.png" alt="Chat" className="w-6 h-6 " />
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 rounded bg-white text-black text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                Chat with stack
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
