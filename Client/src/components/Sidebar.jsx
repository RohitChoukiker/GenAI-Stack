import { useStack } from "../context/StackContext";

const NODE_ITEMS = [
  {
    label: "User Query",
    type: "inputNode",
    icon: "/nodes/query.png",
  },
  {
    label: "Knowledge Base",
    type: "kbNode",
    icon: "/nodes/kb.png",
  },
  {
    label: "LLM (OpenAI)",
    type: "llmNode",
    icon: "/nodes/llm.png",
  },
  {
    label: "Output",
    type: "outputNode",
    icon: "/nodes/output.png",
  },
];

export default function Sidebar() {
  const { currentStack } = useStack();

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-full sm:w-[260px] p-3 sm:p-4 bg-white overflow-y-auto">
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
        {currentStack?.name || ""}
      </h3>

      <div className="
  flex
  gap-2
  sm:flex-col
  sm:gap-2
  overflow-x-auto
  sm:overflow-x-visible
">

        {NODE_ITEMS.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            className="
              border
              rounded
              px-3
              py-2
              mb-0
              sm:mb-2
              cursor-move
              text-[#444444]
              whitespace-nowrap
              flex
              items-center
              gap-3
              bg-white
              border
              border-[#94A3B8]
             
            "
          >
            
            <img
              src={item.icon}
              alt={item.label}
              className="w-5 h-5 object-contain"
            />

           
            <span className="text-sm font-medium flex-1">
              {item.label}
            </span>

           
            <img
              src="/images/3-lineMenu.png"
              alt="Drag"
              className="w-4 h-4 opacity-70"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
