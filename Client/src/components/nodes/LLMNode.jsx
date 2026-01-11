import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Eye, EyeOff } from "lucide-react";

export default function LLMNode() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSerpKey, setShowSerpKey] = useState(false);

  return (
    <div className="relative">
      
      <div
        className="
          w-[303px] h-[730px]
          bg-white
          rounded-[8px]
          border border-[#E6EAF0]
          shadow-[0_8px_24px_rgba(0,0,0,0.08)]
          overflow-hidden
        "
      >
      
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6EAF0]">
          <div className="flex items-center gap-2 text-[18px] font-semibold">
            <img
              src="/nodes/llm.png"
              alt="LLM"
              className="w-[18px] h-[18px]"
            />
            LLM (OpenAI)
          </div>

          <img
            src="/images/Setting-image.png"
            className="w-[18px] h-[18px]"
          />
        </div>

       
        <div className="h-[38px] bg-[#EDF3FF] flex items-center px-4 text-[16px]">
          Run a query with OpenAI LLM
        </div>

       
        <div className="px-4 py-4 space-y-4">
       
          <div>
            <div className="text-[14px] mb-1">Model</div>
            <select className="w-full h-[44px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 text-[16px] bg-white">
              <option>GPT 4o - Mini</option>
              <option>GPT 4o</option>
              <option>GPT 4.1</option>
            </select>
          </div>

        
          <div>
            <div className="text-[14px] mb-1">API Key</div>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                placeholder="****************"
                className="w-full h-[44px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 pr-10 text-[16px]"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

        
          <div className="h-[147.18px]">
  <div className="text-[14px] mb-1 text-[#000000]">
    Prompt
  </div>

  <div
    className="
      w-[271px]
      h-[119px]
      border
      border-[#0000004D]
      rounded-[8px]
      px-3
      py-2
      text-[14px]
      leading-[20px]
      overflow-hidden
    "
  >
    <p className="text-[#000000]">
      You are a helpful PDF assistant. Use web search if the PDF lacks context
    </p>

    <p className="mt-3">
      <span className="text-[#6344BE] font-inter">
        CONTEXT:
      </span>{" "}
      <span className="text-[#000000]">{`{context}`}</span>
    </p>

    <p className="mt-2">
      <span className="text-[#6344BE] font-medium">
        User Query:
      </span>{" "}
      <span className="text-[#000000]">{`{query}`}</span>
    </p>
  </div>
</div>


        
          <div>
            <div className="text-[14px] mb-1">Temperature</div>
            <select className="w-full h-[44px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 text-[16px] bg-white">
              <option>0.25</option>
              <option>0.5</option>
              <option selected>0.75</option>
              <option>1</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[14px]">WebSearch Tool</div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all" />
              <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5" />
            </label>

           

          </div>
          <div className="flex-1 h-[1px] bg-[#D9D9D9]" />

          
          <div>
            <div className="text-[14px] mb-1">SERF API</div>
            <div className="relative">
              <input
                type={showSerpKey ? "text" : "password"}
                placeholder="****************"
                className="w-full h-[44px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 pr-10 text-[16px]"
              />
              <button
                type="button"
                onClick={() => setShowSerpKey(!showSerpKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showSerpKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "51.3%" }}
        className="!w-[12px] !h-[12px] !bg-[#6344BE] !border-[3px] !border-white"
      />
     

      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "55%" }}
        className="!w-[12px] !h-[12px] !bg-[#6344BE] !border-[3px] !border-white"
      />
     

      
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: "94.5%" }}
        className="!w-[12px] !h-[12px] !bg-[#6344BE] !border-[3px] !border-white"
      />
      <div
        className="absolute right-[12px] text-[14px]"
        style={{ top: "94.5%", transform: "translateY(-50%)" }}
      >
        Output
      </div>
    </div>
  );
}
