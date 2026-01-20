'use client'

import { useState } from 'react'

const conversions = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000,
  },
  temperature: {
    celsius: (val: number) => val,
    fahrenheit: (val: number) => (val - 32) * 5/9,
    kelvin: (val: number) => val - 273.15,
  },
}

export default function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('kilometer')
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')

  const convert = () => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setResult('Invalid input')
      return
    }

    if (category === 'temperature') {
      const tempConversions = conversions.temperature as any
      const celsius = tempConversions[fromUnit](numValue)
      const tempConversionsTo = conversions.temperature as any
      let converted = 0

      if (toUnit === 'celsius') {
        converted = celsius
      } else if (toUnit === 'fahrenheit') {
        converted = (celsius * 9/5) + 32
      } else if (toUnit === 'kelvin') {
        converted = celsius + 273.15
      }

      setResult(converted.toFixed(2))
    } else {
      const categoryConversions = conversions[category] as Record<string, number>
      const baseValue = numValue * categoryConversions[fromUnit]
      const convertedValue = baseValue / categoryConversions[toUnit]
      setResult(convertedValue.toFixed(4))
    }
  }

  const units = {
    length: Object.keys(conversions.length),
    weight: Object.keys(conversions.weight),
    temperature: Object.keys(conversions.temperature),
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Unit Converter</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
            >
              {units[category].map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
            >
              {units[category].map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
          />
        </div>
        <button
          onClick={convert}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Convert
        </button>
        {result && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-lg font-semibold">{result} {toUnit}</p>
          </div>
        )}
      </div>
    </div>
  )
}
