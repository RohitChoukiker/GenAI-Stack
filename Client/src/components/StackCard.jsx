import { useNavigate } from "react-router-dom";
import { useStack } from "../context/StackContext";

export default function StackCard({ stack }) {
  const navigate = useNavigate();
  const { stacks } = useStack();
  
 
  const stackData = stacks.find((s) => s.id === stack.id) || stack;

  const handleEditStack = () => {
    navigate(`/builder?stackId=${stack.id}`);
  };
  
  return (
    <div
      className="
        bg-white
        w-[311px]
        h-[168px]
        rounded-xl
        border border-[#E4E8EE]
        p-[20px]
        flex
        flex-col
        justify-between 
      "
    >

      
    
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900">
          {stackData.name}
        </h3>

        <p className="text-sm text-gray-500">
          {stackData.description}
        </p>
      </div>


      <div className="flex justify-end">
        <button
          onClick={handleEditStack}
          className="
            flex
            items-center
            gap-2
            text-sm
            px-3
            py-1.5
            rounded-md
            border-[1px]
            border-[#D5D5D5]
            hover:bg-gray-50
            cursor-pointer
          "
        >
          Edit Stack
          <span className="text-xs">
            <img src="/images/edit.png" alt="Edit" style={{ width: '12px', marginBottom: '2px', height: '12px', display: 'inline' }} />
          </span>
        </button>
      </div>
    </div>
  );
}
