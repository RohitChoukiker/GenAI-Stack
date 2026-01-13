import { Handle, Position } from "reactflow";
import { useState, useEffect } from "react";

export default function InputNode({ id, data }) {
  const [query, setQuery] = useState(data?.query || "");

  useEffect(() => {
    data?.onChange?.({
      query,
    });
  }, [query]);

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
            <img src="/images/entry-image.png" className="w-[18px] h-[18px]" />
            User Query
          </div>
          <img src="/images/Setting-image.png" className="w-[18px] h-[18px]" />
        </div>

        <div className="h-[38px] bg-[#EDF3FF] flex items-center px-4 text-[14px]">
          Enter point for queries
        </div>

        <div className="px-4 pt-4">
          <div className="text-[18px] mb-2">User Query</div>

          <div className="w-[271px] h-[71.59px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 py-2">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Write your query here"
              className="w-full h-full resize-none text-[16px] placeholder:text-[#8F8F8F] focus:outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="absolute right-[1px] bottom-[14px] flex items-center">
        <div className="text-[14px] leading-[17px] mr-4">
          Query
        </div>

      
        <Handle
          id="query"
          type="source"
          position={Position.Right}
          className="
            !w-[12px]
            !h-[12px]
            !bg-[#FFC64C]
            !border-[3px]
            !border-white
            !m-0
          "
        />
      </div>
    </div>
  );
}
