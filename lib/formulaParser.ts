// Formula Parser - Converts OCR text to LaTeX and detects mathematical structures

export interface ParsedFormula {
  latex: string
  detectedStructures: {
    fractions: number
    superscripts: number
    subscripts: number
    roots: number
    equations: number
  }
  confidence: number
}

export function parseFormulaToLatex(text: string): ParsedFormula {
  let latex = text
  const structures = {
    fractions: 0,
    superscripts: 0,
    subscripts: 0,
    roots: 0,
    equations: 0,
  }

  // Detect fractions (a/b, a over b)
  const fractionPattern = /(\w+)\s*\/\s*(\w+)/g
  if (fractionPattern.test(text)) {
    structures.fractions++
    latex = latex.replace(fractionPattern, '\\frac{$1}{$2}')
  }

  // Detect superscripts (x^2, x squared)
  const superscriptPattern = /(\w+)\s*\^\s*(\w+)/g
  if (superscriptPattern.test(text)) {
    structures.superscripts++
    latex = latex.replace(superscriptPattern, '{$1}^{$2}')
  }

  // Detect subscripts (x_1, x sub 1)
  const subscriptPattern = /(\w+)\s*_\s*(\w+)/g
  if (subscriptPattern.test(text)) {
    structures.subscripts++
    latex = latex.replace(subscriptPattern, '{$1}_{$2}')
  }

  // Detect roots (sqrt, root)
  const rootPattern = /sqrt\s*\(([^)]+)\)/gi
  if (rootPattern.test(text)) {
    structures.roots++
    latex = latex.replace(rootPattern, '\\sqrt{$1}')
  }

  // Detect equations (=)
  if (text.includes('=')) {
    structures.equations++
    latex = latex.replace(/=/g, '=')
  }

  // Calculate confidence based on detected structures
  const totalStructures = Object.values(structures).reduce((a, b) => a + b, 0)
  const confidence = Math.min(0.9, 0.5 + totalStructures * 0.1)

  return {
    latex,
    detectedStructures: structures,
    confidence,
  }
}

export function detectSubjectFromText(text: string): 'math' | 'physics' | 'chemistry' | 'commerce' | 'unknown' {
  const lowerText = text.toLowerCase()

  const mathKeywords = ['algebra', 'calculus', 'geometry', 'trigonometry', 'equation', 'solve', 'integral', 'derivative']
  const physicsKeywords = ['force', 'velocity', 'acceleration', 'energy', 'momentum', 'newton', 'electric', 'magnetic']
  const chemistryKeywords = ['molecule', 'atom', 'reaction', 'compound', 'element', 'bond', 'acid', 'base']
  const commerceKeywords = ['profit', 'loss', 'interest', 'account', 'balance', 'investment', 'market']

  if (mathKeywords.some(kw => lowerText.includes(kw))) return 'math'
  if (physicsKeywords.some(kw => lowerText.includes(kw))) return 'physics'
  if (chemistryKeywords.some(kw => lowerText.includes(kw))) return 'chemistry'
  if (commerceKeywords.some(kw => lowerText.includes(kw))) return 'commerce'

  return 'unknown'
}

export function detectChapterFromKeywords(text: string, subject: string): string | null {
  // Placeholder - should map keywords to chapter slugs
  // This would typically query the database for matching chapters
  return null
}
