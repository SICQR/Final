"use client";

import React from "react";
import { Button } from "@/components/ui";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetError={this.resetError} 
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ 
  error, 
  resetError 
}: { 
  error?: Error; 
  resetError: () => void; 
}) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-heading font-bold mb-4 text-hotpink">
          Something went wrong
        </h1>
        <p className="text-gray-300 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left bg-gray-900 p-4 rounded mb-6 text-sm">
            <summary className="cursor-pointer text-hung font-semibold mb-2">
              Error Details
            </summary>
            <pre className="text-red-400 whitespace-pre-wrap">
              {error.message}
              {error.stack && '\n\n' + error.stack}
            </pre>
          </details>
        )}
        <div className="space-y-4">
          <Button onClick={resetError} variant="primary" className="w-full">
            Try Again
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="ghost" 
            className="w-full"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}