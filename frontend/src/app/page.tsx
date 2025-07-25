import Message from "@/components/Message";
import { FaArrowUp } from "react-icons/fa6";
function Homepage() {
  return (
    <div className="pt-20 w-full px-8 items-center flex flex-col pb-20">
      <div className="flex items-center justify-between w-2/3 h-15 bg-gray-200 rounded-full shadow-md px-4 bottom-8 fixed">
        <input type="text" placeholder="Create..." className="px-8 py-4" />
        <FaArrowUp size={35} className="text-white bg-black rounded-full p-2" />
      </div>
      <div className="flex w-2/3 flex-col gap-4 mb-10">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
}

export default Homepage;
