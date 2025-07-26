import React from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";

interface LiveComponentProps {
  jsxCode: string;
  cssCode: string;
}

export default function LiveComponent({
  jsxCode,
  cssCode,
}: LiveComponentProps) {
  // Preprocess JSX code
  let processedJsx = jsxCode.trim();
  // Remove leading comments and blank lines, but keep import React
  processedJsx = processedJsx
    .replace(/^([\s]*\/\/.*\n)*/g, "")
    .replace(/^\s+/, "");
  // Ensure React import is present at the top
  if (!/^import\s+React/.test(processedJsx)) {
    processedJsx = 'import React from "react";\n' + processedJsx;
  }
  // Validate presence of export default and a component definition
  const isValid =
    /import\s+React/.test(processedJsx) &&
    /export\s+default\s+\w+/.test(processedJsx) &&
    /(function|const)\s+\w+/.test(processedJsx);

  if (!isValid) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          border: "1px solid #ccc",
          padding: 16,
          color: "red",
        }}
      >
        Invalid JSX code. Please check that your code defines and exports a
        valid React component.
        <br />
        Example:
        <pre style={{ color: "black", background: "#f5f5f5", padding: 8 }}>
          {`import React from "react";
const FormComponent = () => (
  <form>...</form>
);
export default FormComponent;`}
        </pre>
      </div>
    );
  }

  return (
    <LiveProvider code={processedJsx} scope={{ React }}>
      <style>{cssCode}</style>
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          border: "1px solid #ccc",
          padding: 16,
        }}
      >
        <LivePreview />
        <LiveError />
      </div>
    </LiveProvider>
  );
}
