import { BASE_URL } from "../api/stackApi";

export default function Header({ nodes, edges, stackId }) {
  const viewport = { x: 0, y: 0, zoom: 1 };
  const handleSave = async () => {
    if (!stackId) {
      alert("No stack selected.");
      return;
    }

    const nodeTypeMap = {
      inputNode: { type: "userQuery", id: "user-query" },
      kbNode: { type: "knowledgeBase", id: "kb" },
      llmNode: { type: "llm", id: "llm" },
      outputNode: { type: "output", id: "output" },
    };
    const filteredNodes = nodes.map((node) => {
      const map = nodeTypeMap[node.type] || {};
      let data = {};
      if (map.type === "knowledgeBase") {
        data = {
          embeddingModel: node.data?.embeddingModel,
          apiKey: node.data?.apiKey,
        };
      } else if (map.type === "llm") {
        data = {
          model: node.data?.model,
          apiKey: node.data?.apiKey,
          temperature: node.data?.temperature,
          prompt: node.data?.prompt,
        };
      } else if (map.type === "userQuery") {
        data = {};
      } else if (map.type === "output") {
        data = {};
      }
      return {
        id: map.id || node.id,
        type: map.type || node.type,
        data,
      };
    });
    const filteredEdges = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }));
    const canvasData = { nodes: filteredNodes, edges: filteredEdges, viewport };
    try {
      console.log("Canvas save body:", canvasData);
      await fetch(`${BASE_URL}/stacks/${stackId}/canvas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(canvasData)
      });
      alert("Canvas saved successfully!");
    } catch (err) {
      alert("Failed to save canvas");
    }
  };
  return (
    <header className="h-[55px] w-full border border-[#E4E8EE] bg-white flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" className="h-6 w-6" />
        <span className="font-semibold text-[18px] text-[#0F172A]">
          GenAI Stack
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
    flex
    items-center
    gap-[2px]
    w-[80px]
    h-[30px]
    px-[15px]
    py-[5px]
    border
    border-[#D1D5DB]
    rounded-[6px]
    text-sm
    font-medium
    text-[#374151]
    hover:bg-gray-50
    transition
    cursor-pointer
  "
          onClick={handleSave}
        >
          <img
            src="/images/save-icon.png"
            alt="Save"
            className="mr-2 w-[12px] h-[12px]"
          />
          Save
        </button>

        <div className="w-8 h-8 rounded-full bg-purple-300 text-white flex items-center justify-center font-semibold cursor-pointer">
          S
        </div>
      </div>
    </header>
  );
}
