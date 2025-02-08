"use client";

import { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MdContentCopy } from "react-icons/md";
import { FaLeaf } from "react-icons/fa";

export default function Page() {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);

  const genText = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Explain how the following activity contributes to the carbon footprint in detail: ${input}. Provide specific metrics or environmental impacts in a concise paragraph.`;

      const result = await model.generateContent(prompt);
      const response = result.response;

      const text = response.text();
      setInput("");
      setGeneratedText(text);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  const onCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed px-4"
      style={{
        backgroundImage: "url('/chatbotimg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl w-full p-6 sm:p-8 bg-white rounded-lg shadow-2xl relative">
        {/* Header */}
        <h1 className="text-xl sm:text-3xl font-bold text-green-800 mb-6 text-center flex items-center justify-center">
          <FaLeaf className="text-3xl sm:text-4xl mr-2" />
          Carbon Footprint Analyzer
        </h1>

        {/* Chat Interface */}
        <div className="space-y-6">
          {/* Generated Response */}
          <div className="relative bg-gray-50 border border-gray-300 rounded-lg p-4 min-h-[8rem] sm:min-h-[10rem] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-4 border-green-600"></div>
              </div>
            ) : generatedText ? (
              <div className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap">
                {generatedText}
              </div>
            ) : (
              <p className="text-gray-400 text-center text-sm sm:text-base">
                Your generated analysis will appear here...
              </p>
            )}

            {/* Copy Button (visible only when text is generated) */}
            {generatedText && (
              <button
                onClick={onCopyText}
                className="absolute top-2 right-2 text-gray-500 hover:text-green-600 transition-all"
              >
                <MdContentCopy size={20} />
              </button>
            )}
          </div>

          {/* Input Field */}
          <div className="flex flex-col sm:flex-row items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter an activity (e.g., flying, meat consumption)"
              className="w-full sm:flex-1 border border-gray-300 rounded-md sm:rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base mb-4 sm:mb-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") genText();
              }}
            />
            <button
              onClick={genText}
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-md sm:rounded-r-md hover:bg-green-700 focus:ring-2 focus:ring-offset-1 focus:ring-green-500 transition-all text-sm sm:text-base"
            >
              Generate
            </button>
          </div>

          {/* Footer Message */}
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            This tool calculates carbon footprints for common activities.
          </p>
        </div>
      </div>
    </div>
  );
}
