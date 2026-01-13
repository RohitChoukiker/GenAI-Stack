
import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { Eye, EyeOff } from "lucide-react";
import { useStack } from "../../context/StackContext";
import { uploadKnowledgeBaseApi } from "../../api/stackApi";


export default function KnowledgeBaseNode({ id, data }) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSerpKey, setShowSerpKey] = useState(false);
  const [model, setModel] = useState(data?.model || "GPT 4o - Mini");
  const [apiKey, setApiKey] = useState(data?.apiKey || "");
  const [temperature, setTemperature] = useState(data?.temperature || 0.75);
  const [prompt, setPrompt] = useState(data?.prompt || "");
  const [serpKey, setSerpKey] = useState(data?.serpKey || "");
  const [webSearch, setWebSearch] = useState(data?.webSearch || false);
  const [file, setFile] = useState(data?.file || null);
  const [embeddingModel, setEmbeddingModel] = useState(data?.embeddingModel || "");
  // Send all KB node data to parent on change
  useEffect(() => {
    data?.onChange?.({
      embeddingModel,
      apiKey,
      file,
      showApiKey,
      showSerpKey,
      model,
      temperature,
      prompt,
      serpKey,
      webSearch,
    });
  }, [embeddingModel, apiKey, file, showApiKey, showSerpKey, model, temperature, prompt, serpKey, webSearch]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentStack } = useStack();
  
  const lastUploadedRef = useRef({ name: null, size: null, stackId: null, model: null, apiKey: null });

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setSuccess("");
    setError("");
  };

  const handleModelChange = (e) => {
    setEmbeddingModel(e.target.value);
    setSuccess("");
    setError("");
  };



  const intervalRef = useRef(null);

  const uploadIfReady = async () => {
    if (!currentStack?.id || !file || !embeddingModel || !apiKey) return;
   
    const last = lastUploadedRef.current;
    if (
      last.name === file.name &&
      last.size === file.size &&
      last.stackId === currentStack.id &&
      last.model === embeddingModel &&
      last.apiKey === apiKey
    ) {
    
      return;
    }
    setUploading(true);
    setError("");
    setSuccess("");
    try {
      await uploadKnowledgeBaseApi({
        stackId: currentStack.id,
        file,
        embeddingModel,
        apiKey,
      });
      setSuccess("Knowledge base uploaded!");
      lastUploadedRef.current = {
        name: file.name,
        size: file.size,
        stackId: currentStack.id,
        model: embeddingModel,
        apiKey: apiKey,
      };
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (file && embeddingModel && apiKey && currentStack?.id) {
      
      uploadIfReady();
      intervalRef.current = setInterval(() => {
        uploadIfReady();
      }, 5 * 60 * 1000); 
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  
  }, [file, embeddingModel, apiKey, currentStack?.id]);

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
            <label className="h-[64px] border border-dashed border-[#4CAF50] rounded-[8px] flex items-center justify-center gap-3 text-[#4CAF50] text-[18px] cursor-pointer">
              {file ? file.name : "Upload File"}
              <img src="/images/upload-image.png" className="w-4 h-4" />
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div>
            <div className="text-[16px] mb-2">Embedding Model</div>
            <select
              className="w-full h-[44px] border border-[rgba(0,0,0,0.3)] rounded-[8px] px-3 text-[16px] bg-white"
              value={embeddingModel}
              onChange={handleModelChange}
            >
              <option value="">Select Model</option>
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-4.1">gpt-4.1</option>
              <option value="gpt-4-turbo">gpt-4-turbo</option>
              <option value="o3">o3</option>
              <option value="o3-mini">o3-mini</option>
            </select>
          </div>
          <div>
            <div className="text-[16px] mb-2">API Key</div>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
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
     
            {uploading && <div className="text-green-500 text-sm mt-2">Uploading...</div>}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
          </div>

        </div>
      </div>

     
      <Handle
  type="target"
  position={Position.Left}
  style={{ top: "84%" }}  
  className="!w-[12px] !h-[12px] !bg-[#FF7A38] !border-[3px] !border-white"
/>

<div
  className="absolute left-[34px] text-[14px]"
  style={{ top: "81.7%", transform: "translate(-58%)" }}  
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