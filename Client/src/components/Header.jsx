export default function Header() {
  return (
    <header className="h-[55px] w-full max-w-full border border-[#E4E8EE] bg-[#FFFFFF] flex items-center justify-between px-4 sm:px-6 opacity-100">
      
      
      <div className="flex items-center gap-2">
       
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-6 w-6"
        />
        <span className="font-[600] text-[18px] text-[#0F172A]">
          GenAI Stack
        </span> 
      </div>


      <div className="w-8 h-8 rounded-full bg-purple-300 text-white flex items-center justify-center font-semibold cursor-pointer">
        S
      </div>

    </header>
  );
}
