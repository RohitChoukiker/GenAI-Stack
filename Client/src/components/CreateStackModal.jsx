export default function CreateStackModal({ isOpen, onCreate }) {
    if (!isOpen) return null;
  
    return (
      <div className="flex items-center justify-center">
        <div
          className="
            bg-white
            w-[425px]
            h-[220px]
            border border-[#E4E8EE]
            rounded-[20px]
            px-[50px]
            py-[45px]
            flex
            flex-col
            gap-[10px]
          "
        >
          <h2 className="text-[22px] font-semibold text-gray-900">
            Create New Stack
          </h2>
  
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Start building your generative AI apps with
            <br />
            our essential tools and frameworks
          </p>
  
          <button
            onClick={onCreate}
            className="
              mt-auto
              inline-flex
              items-center
              gap-2
              bg-[#5E8F57]
              text-white
              px-5
              py-2
              rounded-md
              text-sm
              hover:bg-[#4f7d49]
              w-fit
              cursor-pointer
            "
          >
            + New Stack
          </button>
        </div>
      </div>
    );
  }
  