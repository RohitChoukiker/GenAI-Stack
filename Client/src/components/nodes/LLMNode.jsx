import { Handle } from "reactflow";

export default function LLMNode() {
  return (
    <div className="bg-white border rounded-lg w-[260px]">
      <div className="px-3 py-2 border-b font-medium">
        LLM (OpenAI)
      </div>

      <div className="p-3 text-sm space-y-2">
        <select className="w-full border rounded px-2 py-1">
          <option>GPT-4o Mini</option>
        </select>

        <textarea
          rows={3}
          placeholder="Prompt"
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
}
