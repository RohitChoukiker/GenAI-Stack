import { useState } from "react";
import StackCard from "../components/StackCard";
import CreateStackModal from "../components/CreateStackModal";
import CreateStackFormModal from "../components/CreateStackFormModal";
import { useStack } from "../context/StackContext";

export default function Stacks() {
  const { stacks, createStack } = useStack();
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  useState(() => {
    if (stacks.length > 0 || stacks.length === 0) {
      setLoading(false);
    }
  }, [stacks]);

  const handleCreateStack = async (newStack) => {
    setError("");
    try {
      await createStack(newStack);
    } catch (err) {
      setError("Failed to create stack. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Stacks</h1>
        <button
          onClick={() => setOpenCreateForm(true)}
          className="bg-[#44924C] text-white px-4 py-2 rounded hover:bg-[#3a7a40]"
        >
          + New Stack
        </button>
      </div>
      <div className="w-full h-0.5 bg-[#E4E8EE] opacity-100 mx-1.5" />

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#44924C] mr-4"></div>
          <span className="text-lg text-gray-600">Loading stacks...</span>
        </div>
      ) : stacks.length === 0 ? (
        <div className="flex justify-center mt-20">
          <CreateStackModal
            isOpen={true}
            onCreate={() => setOpenCreateForm(true)}
          />
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4
            mt-6
          "
        >
          {stacks.map((stack) => (
            <StackCard key={stack.id} stack={stack} className="p-2" />
          ))}
        </div>
      )}

      <CreateStackFormModal
        isOpen={openCreateForm}
        onClose={() => setOpenCreateForm(false)}
        onCreate={async (data) => {
          await handleCreateStack(data);
          setOpenCreateForm(false);
        }}
      />
      {error && (
        <div className="text-red-500 mt-2 text-center">{error}</div>
      )}
    </div>
  );
}