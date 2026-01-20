'use client'

import { useState } from 'react'

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num)
    } else {
      setDisplay(display + num)
    }
  }

  const handleOperation = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display))
      setDisplay('0')
      setOperation(op)
    } else {
      calculate()
      setOperation(op)
    }
  }

  const calculate = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display)
      let result = 0

      switch (operation) {
        case '+':
          result = previousValue + current
          break
        case '-':
          result = previousValue - current
          break
        case '*':
          result = previousValue * current
          break
        case '/':
          result = previousValue / current
          break
        case '^':
          result = Math.pow(previousValue, current)
          break
        default:
          return
      }

      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
    }
  }

  const handleFunction = (func: string) => {
    const value = parseFloat(display)
    let result = 0

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180)
        break
      case 'cos':
        result = Math.cos(value * Math.PI / 180)
        break
      case 'tan':
        result = Math.tan(value * Math.PI / 180)
        break
      case 'log':
        result = Math.log10(value)
        break
      case 'ln':
        result = Math.log(value)
        break
      case 'sqrt':
        result = Math.sqrt(value)
        break
      default:
        return
    }

    setDisplay(result.toString())
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Scientific Calculator</h2>
      <div className="mb-4">
        <input
          type="text"
          value={display}
          readOnly
          className="w-full px-4 py-3 text-right text-2xl bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {['sin', 'cos', 'tan', 'log', 'ln'].map((func) => (
          <button
            key={func}
            onClick={() => handleFunction(func)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {func}
          </button>
        ))}
        {['7', '8', '9', '/', 'sqrt'].map((btn) => (
          <button
            key={btn}
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperation(btn)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {btn}
          </button>
        ))}
        {['4', '5', '6', '*', '^'].map((btn) => (
          <button
            key={btn}
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperation(btn)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {btn}
          </button>
        ))}
        {['1', '2', '3', '-', '('].map((btn) => (
          <button
            key={btn}
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperation(btn)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {btn}
          </button>
        ))}
        {['0', '.', '=', '+', ')'].map((btn) => (
          <button
            key={btn}
            onClick={() => btn === '=' ? calculate() : btn.match(/\d|\./) ? handleNumber(btn) : handleOperation(btn)}
            className={`px-4 py-2 rounded ${
              btn === '='
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={clear}
          className="col-span-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
