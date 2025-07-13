import React from 'react';

interface DisplayProps {
  value: string;
  expression: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression }) => {
  return (
    <div className="bg-black/20 rounded-2xl p-4 mb-4 border border-white/10">
      {/* Expression/History Line */}
      <div className="text-right text-slate-400 text-sm min-h-[20px] mb-2 font-mono">
        {expression || '\u00A0'}
      </div>
      
      {/* Main Display */}
      <div className="text-right text-white text-4xl font-light font-mono leading-none overflow-hidden">
        {value.length > 12 ? value.slice(-12) : value}
      </div>
    </div>
  );
};

export default Display;