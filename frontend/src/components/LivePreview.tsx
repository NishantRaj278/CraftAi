import React from "react";
import { LiveProvider, LiveError, LivePreview as RLPreview } from "react-live";

const defaultScope = {
  React,
};

function LivePreview({ jsxCode }: { jsxCode: string }) {
  // Show a default preview if jsxCode is empty or invalid
  const safeCode =
    jsxCode && jsxCode.trim().length > 0
      ? jsxCode
      : `(<BlueButton text="Click Me" onClick={() => alert('Button clicked!')} />)`;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        background: "#fafafa",
      }}
    >
      <LiveProvider code={safeCode} scope={defaultScope}>
        <LiveError />
        <div style={{ position: "relative", minHeight: 40, marginBottom: 16 }}>
          <RLPreview />
        </div>
      </LiveProvider>
    </div>
  );
}

export default LivePreview;
