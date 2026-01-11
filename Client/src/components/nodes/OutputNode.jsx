import { Handle, Position } from "reactflow";

export default function OutputNode() {
  return (
    <div className="relative">
   
      <div
        className="
          w-[303px]
          h-[253px]
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
              src="/nodes/output.png"
              alt="Output"
              className="w-[18px] h-[18px]"
            />
            Output
          </div>

          <img
            src="/images/Setting-image.png"
            className="w-[18px] h-[18px]"
          />
        </div>

       
        <div className="h-[38px] bg-[#EDF3FF] flex items-center px-4 text-[14px]">
          Output of the result nodes as text
        </div>

       
        <div className="px-4 pt-4">
          <div className="text-[18px] mb-2">Output Text</div>

          <div className="w-[271px] h-[71.59px] rounded-[8px] bg-[#F7F7F7] px-3 py-2 font-[400] text-[12px] text-[#00000080]">
            Output will be generated based on query
          </div>
        </div>
      </div>

     
      <div className="absolute left-[1px] bottom-[14px] flex items-center">
        <Handle
          type="target"
          position={Position.Left}
          className="
            !w-[12px]
            !h-[12px]
            !bg-[#22C55E]
            !border-[3px]
            !border-white
            !m-0
          "
        />

        <div className="text-[14px] leading-[17px] ml-4">
          Output
        </div>
      </div>
    </div>
  );
}
