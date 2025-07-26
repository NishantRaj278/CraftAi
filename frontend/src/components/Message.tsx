import { FaUser } from "react-icons/fa";
import LivePreview from "./LivePreview";

interface ChatProp {
  _id: string;
  message: string;
  generatedCode: string;
}

function Message({ chat }: { chat: ChatProp }) {
  // Split generatedCode into jsx and css
  let jsxCode = "";
  let cssCode = "";
  try {
    // Simple extraction for demo: look for jsx and css code blocks
    const jsxMatch = chat.generatedCode.match(/```jsx([\s\S]*?)```/);
    const cssMatch = chat.generatedCode.match(/```css([\s\S]*?)```/);
    jsxCode = jsxMatch ? jsxMatch[1].trim() : "";
    cssCode = cssMatch ? cssMatch[1].trim() : "";
  } catch {
    jsxCode = chat.generatedCode;
    cssCode = "";
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-6">
      <div className="flex items-center mb-2">
        <FaUser className="text-gray-500 mr-2" size={20} />
        <p className="font-semibold">{chat.message}</p>
      </div>
      {/* Preview Section */}
      <div className="mb-4">
        <h2 className="font-bold mb-2">Live Preview</h2>
        <LivePreview jsxCode={jsxCode} />
      </div>
      {/* Code Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">JSX Code</h3>
          <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
            {jsxCode}
          </pre>
        </div>
        <div>
          <h3 className="font-semibold mb-2">CSS Code</h3>
          <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Message;
