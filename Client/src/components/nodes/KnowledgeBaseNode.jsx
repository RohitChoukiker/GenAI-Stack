import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Eye, EyeOff } from "lucide-react";

export default function KnowledgeBaseNode() {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="relative w-[303px]">
    
      <div className="bg-white h-[500px] rounded-[8px] border border-[#E6EAF0] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden">
        
  
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6EAF0]">
          <div className="flex items-center gap-2 text-[18px] font-semibold">
            <img src="/images/entry-image.png" className="w-[18px] h-[18px]" />
            Knowledge Base
          </div>
          <img src="/images/Setting-image.png" className="w-[18px] h-[18px]" />
        </div>

       
        <div className="h-[38px] bg-[#EDF3FF] flex items-center px-4 text-[16px]">
          Let LLM search info in your file
        </div>


        <div className="px-4 py-4 space-y-4">
     
          <div>
            <div className="text-[16px] mb-2">File for Knowledge Base</div>
            <div className="h-[64px] border border-dashed border-[#4CAF50] rounded-[8px] flex items-center justify-center gap-3 text-[#4CAF50] text-[18px] cursor-pointer">
              Upload File
              <img src="/images/upload-image.png" className="w-4 h-4" />
            </div>
          </div>

          
          <div>
            <div className="text-[16px] mb-2">Embedding Model</div>
            <select className="w-full h-[44px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 text-[16px] bg-white">
              <option>gpt-4o</option>
              <option>gpt-4.1</option>
              <option>gpt-4-turbo</option>
              <option>o3</option>
              <option>o3-mini</option>
            </select>
          </div>

    
          <div>
            <div className="text-[16px] mb-2">API Key</div>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full h-[44px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 pr-10 text-[16px]"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <Handle
  type="target"
  position={Position.Left}
  style={{ top: "82%" }}  
  className="!w-[12px] !h-[12px] !bg-[#FF7A38] !border-[3px] !border-white"
/>

<div
  className="absolute left-[34px] text-[14px]"
  style={{ top: "79.7%", transform: "translate(-58%)" }}  
>
  Query
</div>


   
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: "90%" }}
        className="!w-[12px] !h-[12px] !bg-[#FF7A38] !border-[3px] !border-white"
      />
      <div
        className="absolute right-[12px] text-[14px]"
        style={{ top: "90%", transform: "translateY(-50%)" }}
      >
        Context
      </div>
    </div>
  );
}
