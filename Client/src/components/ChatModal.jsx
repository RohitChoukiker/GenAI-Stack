import { useEffect, useRef } from "react";

export default function ChatModal({
  show,
  onClose,
  chatMessages,
  chatInput,
  setChatInput,
  sendChatMessage,
  chatLoading,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  if (!show) return null;

  const isEmpty = chatMessages.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-[1100px] h-[80%] flex flex-col">

       
        <div className="flex items-center justify-between px-6 py-4 ">
          <div className="flex items-center gap-2">
                           <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
            <span className="font-semibold text-lg">GenAI Stack Chat</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
        </div>


        <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
          {isEmpty ? (
            
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
              <div className="flex items-center gap-2">
                <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
                <div className="font-medium text-[#000000]">GenAI Stack Chat</div>
              </div>
              <div className="text-sm">Start a conversation to test your stack</div>
            </div>
          ) : (
         
            <div className="flex flex-col gap-6 max-w-3xl ml-8">

              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
                      ${msg.from === "user" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                  >
                    {msg.from === "user" ? <img src="/images/bot-icon.png" alt="logo" className="w-8 h-8" /> : "🤖"}
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3 text-sm text-gray-800 ">
                    {msg.text}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex gap-3 items-center text-gray-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">🤖</div>
                  Thinking...
                </div>
              )}
            </div>
          )}
        </div>

     
        <div className="px-6 py-4  bg-transparent">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendChatMessage();
            }}
            className="flex items-center gap-3  rounded-xl px-4 py-3 bg-[#F5F5F7]"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={chatLoading ? "Thinking..." : "Send a message"}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={chatLoading}
              className="flex-1 outline-none text-sm bg-transparent"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-40 cursor-pointer"
            >
             <img src="/images/send.png" alt="Send" className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
