import { useState } from "react";
import StackCard from "../components/StackCard";
import CreateStackModal from "../components/CreateStackModal";
import CreateStackFormModal from "../components/CreateStackFormModal";

export default function Stacks() {
  const [stacks, setStacks] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const handleCreateStack = (newStack) => {
    setStacks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newStack,
      },
    ]);
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

      <div className="w-full h-[2px] bg-[#E4E8EE] opacity-100 mx-[6px]" />


      {stacks.length === 0 && (
        <div className="flex justify-center mt-20">
          <CreateStackModal
            isOpen={true}
            onCreate={() => setOpenCreateForm(true)}
          />
        </div>
      )}

      {/* STACK LIST */}
      {stacks.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {stacks.map((stack) => (
            <StackCard key={stack.id} stack={stack} />
          ))}
        </div>
      )}

      {/* CREATE STACK FORM MODAL */}
      <CreateStackFormModal
        isOpen={openCreateForm}
        onClose={() => setOpenCreateForm(false)}
        onCreate={(data) => {
          handleCreateStack(data);
          setOpenCreateForm(false);
        }}
      />
    </div>
  );
}
