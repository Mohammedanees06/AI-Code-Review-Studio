import React, { useState } from 'react';

const customStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  
    scrollbar-width: none;  
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  
  }
`;

function App() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/ai/get-ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      
      const cleanResponse = (data.response || 'No response')
        .replace(/\*\*(.*?)\*\*/g, '$1')  
        .replace(/\*(.*?)\*/g, '$1')      
        .replace(/^#+\s/gm, '')          
        .replace(/`([^`]+)`/g, '$1')      
        .replace(/^\s*[-*+]\s/gm, '• ')   /
        .trim();
      setReview(cleanResponse);
    } catch (error) {
      console.error(error);
      setReview(' Error connecting to AI server.');
    }
    setLoading(false);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            AI Code Review Studio
          </h1>
          <p className="text-slate-300 mt-1 text-sm sm:text-base">Analyze your code with AI-powered insights</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Code Input */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs">📝</span>
                Write Your Code
              </h2>
              <p className="text-slate-300 text-sm mt-1">Paste your code for AI analysis</p>
            </div>
            
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <div className="flex-1 relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                      e.preventDefault();
                      if (code.trim() && !loading) {
                        handleReview();
                      }
                    }
                  }}
                  placeholder=""

              function example() {
                console.log('Hello, World!');
                        }"
                  className="w-full h-full p-3 sm:p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none backdrop-blur-sm"
                />
                <div className="absolute top-2 right-2 text-xs text-slate-500 bg-slate-800/80 px-2 py-1 rounded">
                  {code.length} chars
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs sm:text-sm text-slate-400 flex flex-wrap items-center gap-2">
                  {code.length > 0 ? (
                    <>
                      <span>Ready for review</span>
                      <span className="text-slate-500 hidden sm:inline">•</span>
                      <kbd className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded font-mono border border-slate-600">
                        Ctrl+Enter
                      </kbd>
                      <span className="text-slate-500">to submit</span>
                    </>
                  ) : (
                    "Enter code to begin"
                  )}
                </div>
                <div className="flex gap-2 sm:gap-3">
                  {code.length > 0 && (
                    <button
                      onClick={() => setCode('')}
                      className="px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={handleReview}
                    disabled={loading || !code.trim()}
                    className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-lg sm:rounded-xl font-medium sm:font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                          </svg>
                          <span className="hidden sm:inline">Reviewing...</span>
                          <span className="sm:hidden">Wait...</span>
                        </>
                      ) : (
                        <>
                          <span>🔍</span>
                          <span className="hidden sm:inline">Review Code</span>
                          <span className="sm:hidden">Review</span>
                        </>
                      )}
                    </div>
                    
                    {/* Animated border effect */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200 -z-10 blur"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Review Output */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs">✨</span>
                Code Review
              </h2>
              <p className="text-slate-300 text-sm mt-1">AI analysis and recommendations</p>
            </div>
            
            <div className="p-4 sm:p-6 flex-1 flex flex-col min-h-0">
              <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 p-3 sm:p-4 bg-slate-800/30 border border-slate-600/30 rounded-xl overflow-y-auto overflow-x-hidden scrollbar-hide">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                          <span className="text-xl">🤖</span>
                        </div>
                        <p className="text-slate-300 font-medium text-sm sm:text-base">AI is analyzing your code...</p>
                        <p className="text-slate-500 text-xs sm:text-sm mt-2">This may take a few moments</p>
                      </div>
                    </div>
                  ) : review ? (
                    <div className="text-slate-100 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-mono">
                      {review}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-slate-400">
                        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <span className="text-2xl">🤖</span>
                        </div>
                        <p className="font-medium text-sm sm:text-base">Ready for code review</p>
                        <p className="text-xs sm:text-sm mt-2">Submit your code to get AI-powered insights</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {review && !loading && (
                <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-400">Review completed</span>
                  <button 
                    onClick={() => setReview('')}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Clear results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
