import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in MONOLITH application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono">
          <div className="max-w-lg w-full bg-zinc-950 border border-zinc-800 rounded-xl p-8 space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
              !
            </div>
            <h1 className="text-lg font-bold text-white">Application Notice</h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The application encountered a render issue. Please click below to refresh the workspace.
            </p>
            {this.state.error && (
              <pre className="p-3 bg-black rounded border border-zinc-800 text-[11px] text-zinc-400 overflow-x-auto">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 bg-white text-black font-semibold text-xs rounded hover:bg-zinc-200 transition"
            >
              Reset Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
