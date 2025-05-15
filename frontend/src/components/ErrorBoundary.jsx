import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
            <p className="mb-4">Please try refreshing the page or contact support.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;