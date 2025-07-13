import React, { useState, useCallback } from 'react';
import Display from './Display';
import Button from './Button';
import { Delete, RotateCcw } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<{ display: string; expression: string }[]>([]);

  const saveToHistory = () => {
    setHistory((prev) => [...prev, { display, expression }]);
  };

  const inputNumber = useCallback((num: string) => {
    saveToHistory();
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
      setExpression(prev => prev + num);
    } else {
      setDisplay(display === '0' ? num : display + num);
      setExpression(prev => prev === '0' ? num : prev + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    saveToHistory();
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      setExpression(prev => prev + '0.');
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
      setExpression(prev => prev + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
    setHistory([]);
  }, []);

  const deleteDigit = useCallback(() => {
    saveToHistory();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression(prev => prev.slice(0, -1));
    } else {
      setDisplay('0');
      setExpression('0');
    }
  }, [display]);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(prev => prev + ` ${nextOperation} `);
    } else if (operation) {
      saveToHistory();
      const currentValue = previousValue || 0;
      let result: number;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          if (inputValue === 0) {
            setDisplay('Error');
            setExpression('Cannot divide by zero');
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
            return;
          }
          result = currentValue / inputValue;
          break;
        default:
          return;
      }

      setPreviousValue(result);
      setDisplay(String(result));

      if (nextOperation === '=') {
        setExpression(prev => prev + ` = ${result}`);
        setOperation(null);
        setPreviousValue(null);
        setWaitingForOperand(true);
      } else {
        setExpression(prev => prev + ` ${nextOperation} `);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculatePercentage = useCallback(() => {
    saveToHistory();
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
    setExpression(prev => prev + '%');
  }, [display]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      setDisplay(last.display);
      setExpression(last.expression);
      setHistory((prev) => prev.slice(0, -1));
    }
  }, [history]);

  const handleButtonClick = useCallback((value: string) => {
    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        inputNumber(value);
        break;
      case '.':
        inputDecimal();
        break;
      case 'C':
        clear();
        break;
      case '⌫':
        deleteDigit();
        break;
      case '↺':
        undo();
        break;
      case '%':
        calculatePercentage();
        break;
      case '=':
      case '+':
      case '-':
      case '*':
      case '/':
        performOperation(value);
        break;
      default:
        break;
    }
  }, [
    inputNumber,
    inputDecimal,
    clear,
    deleteDigit,
    calculatePercentage,
    performOperation,
    undo,
  ]);

  const buttons = [
    ['↺', 'C', '⌫', '%'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '+', '='],
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
      <Display value={display} expression={expression} />

      <div className="grid grid-cols-4 gap-3 mt-6">
        {buttons.map((row, rowIndex) =>
          row.map((btn, colIndex) => {
            let className = '';
            let span = '';
            let icon = null;

            if (btn === 'C' || btn === '⌫' || btn === '↺') {
              className = 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30';
            } else if (['+', '-', '*', '/', '='].includes(btn)) {
              className = 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30';
            } else if (btn === '%') {
              className = 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30';
            } else if (btn === '0') {
              className = 'bg-white/10 text-white border-white/20 hover:bg-white/20';
            } else {
              className = 'bg-white/10 text-white border-white/20 hover:bg-white/20';
            }

            if (btn === '⌫') icon = <Delete size={20} />;
            if (btn === '↺') icon = <RotateCcw size={20} />;

            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleButtonClick(btn)}
                className={`${className} ${span}`}
                icon={icon}
              >
                {btn === '⌫' || btn === '↺' ? '' : btn}
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Calculator;
