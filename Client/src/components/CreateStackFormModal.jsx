import { useState } from "react";

export default function CreateStackFormModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      name: name.trim(),
      description: description.trim(),
    });

    setName("");
    setDescription("");
  };

  const isFormValid = name.trim() && description.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[542px] rounded-[10px] border border-[#E4E8EE] flex flex-col shadow-sm">
        
  
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E8EE]">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New Stack
          </h2>
          <button
            onClick={onClose}
            className="text-xl cursor-pointer text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[10px] px-6 py-5"
        >
  
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#444444] font-medium">
              Name
            </label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="
                h-10
                rounded-md
                border
                border-gray-300
                px-3
                outline-none
                focus:outline-none
                focus:ring-0
                focus:border-gray-300
                hover:border-gray-300
              "
            />
          </div>

       
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#444444] font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="
                rounded-md
                border
                border-gray-300
                px-3
                py-2
                resize-none
                outline-none
                focus:outline-none
                focus:ring-0
               
              "
            />
          </div>

        
          <div className="flex justify-end gap-4 pt-4 border-t border-[#E4E8EE] mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-4 py-2 rounded-md text-white ${
                isFormValid
                  ? "bg-[#4CAF50] hover:bg-[#45a049] cursor-pointer"
                  : "bg-[#DDE7DD] cursor-not-allowed"
              }`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
