import { FaUser, FaCode, FaEye } from "react-icons/fa";
import { useState } from "react";
import LivePreview from "./LivePreview";
import { FaRegCopy } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import JSZip from "jszip";

interface ChatProp {
  _id: string;
  message: string;
  generatedCode: string;
}

function Message({ chat }: { chat: ChatProp }) {
  // Download ZIP handler
  const handleDownloadZip = () => {
    const zip = new JSZip();
    zip.file("component.jsx", jsxCode);
    zip.file("styles.css", cssCode);
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "code-export.zip";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    });
  };
  // Copy to clipboard state and handler
  const [copiedJSX, setCopiedJSX] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  const handleCopy = (text: string, type: "jsx" | "css") => {
    navigator.clipboard.writeText(text);
    if (type === "jsx") {
      setCopiedJSX(true);
      setTimeout(() => setCopiedJSX(false), 5000);
    } else {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 5000);
    }
  };
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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
      {/* Message Header */}
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 p-6 border-b border-gray-700/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <FaUser className="text-white text-sm" />
          </div>
          <div className="flex-grow">
            <p className="text-white font-medium leading-relaxed">
              {chat.message}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Live Preview Section */}
        {jsxCode && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FaEye className="text-white text-sm" />
              </div>
              <h2 className="text-white font-semibold text-lg">Live Preview</h2>
            </div>
            <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">Preview</span>
                </div>
              </div>
              <div className="p-4 bg-white min-h-[200px]">
                <LivePreview jsxCode={jsxCode} />
              </div>
            </div>
          </div>
        )}

        {/* Code Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* JSX Code */}
          {jsxCode && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <FaCode className="text-white text-sm" />
                </div>
                <h3 className="text-white font-semibold">JSX Code</h3>
                <button
                  className="ml-auto px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1"
                  onClick={() => handleCopy(jsxCode, "jsx")}
                  type="button"
                  title="Copy JSX"
                  disabled={copiedJSX}
                >
                  {copiedJSX ? (
                    <span className="text-green-400">&#10003;</span>
                  ) : (
                    <FaRegCopy className="h-4 w-4 cursor-pointer" />
                  )}
                </button>
              </div>
              <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">component.jsx</span>
                </div>
                <div className="relative">
                  <SyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    customStyle={{
                      background: "transparent",
                      fontSize: "0.95rem",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      margin: 0,
                    }}
                  >
                    {jsxCode}
                  </SyntaxHighlighter>
                  <button
                    className="absolute top-2 right-2 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-medium transition-all duration-200"
                    onClick={handleDownloadZip}
                    type="button"
                    title="Download ZIP"
                  >
                    Export ZIP
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CSS Code */}
          {cssCode && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <FaCode className="text-white text-sm" />
                </div>
                <h3 className="text-white font-semibold">CSS Code</h3>
                <button
                  className="ml-auto px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1"
                  onClick={() => handleCopy(cssCode, "css")}
                  type="button"
                  title="Copy CSS"
                  disabled={copiedCSS}
                >
                  {copiedCSS ? (
                    <span className="text-green-400">&#10003;</span>
                  ) : (
                    <FaRegCopy className="h-4 w-4 cursor-pointer" />
                  )}
                </button>
              </div>
              <div className="bg-gray-900/80 rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">styles.css</span>
                </div>
                <div className="relative">
                  <SyntaxHighlighter
                    language="css"
                    style={oneDark}
                    customStyle={{
                      background: "transparent",
                      fontSize: "0.95rem",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      margin: 0,
                    }}
                  >
                    {cssCode}
                  </SyntaxHighlighter>
                  <button
                    className="absolute top-2 right-2 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-medium transition-all duration-200"
                    onClick={handleDownloadZip}
                    type="button"
                    title="Download ZIP"
                  >
                    Export ZIP
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
