import React from "react";
import { LiveProvider, LiveError, LivePreview as RLPreview } from "react-live";

const defaultScope = {
  React,
};

interface LivePreviewProps {
  htmlCode: string;
}

function LivePreview({ htmlCode }: LivePreviewProps) {
  // If htmlCode is provided, render it in an iframe for live preview
  if (htmlCode && htmlCode.trim().length > 0) {
    return (
      <iframe
        style={{
          width: "100%",
          minHeight: 200,
          border: "none",
          background: "#fff",
          borderRadius: 8,
        }}
        srcDoc={htmlCode}
        sandbox="allow-scripts allow-same-origin"
        title="Live HTML Preview"
      />
    );
  }

  // Show a default preview if htmlCode is empty or invalid
  const safeCode =
    htmlCode && htmlCode.trim().length > 0
      ? htmlCode
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
