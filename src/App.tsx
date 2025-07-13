import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calculator</h1>
          <p className="text-slate-300">Built with precision and style</p>
        </div> */}
        <Calculator />
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>Created by <a href="https://github.com/ajay-dhangar" className="text-purple-400 hover:text-purple-300 transition-colors"><strong>Ajay Dhangar</strong></a></p>
        </div>
      </div>
    </div>
  );
}

export default App;