import { Check } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans - MscTutor | Affordable Online Learning for Math, Science & Commerce',
  description: 'Choose the best pricing plan for MscTutor. Free and premium plans available with credits for AI queries, image uploads, and memory storage.',
  keywords: 'msctutor pricing, online learning pricing, math tutor price, science tutor price, affordable education, online classes price',
}

const plans = [
  {
    name: 'Free',
    price: 0,
    credits: 10,
    features: [
      '10 AI queries per month',
      'Access to free content',
      'Basic calculators',
      'Community support',
    ],
  },
  {
    name: 'Basic',
    price: 9.99,
    credits: 100,
    features: [
      '100 AI queries per month',
      'Access to all content',
      'All calculators',
      'Priority support',
      'Save up to 50 questions',
    ],
  },
  {
    name: 'Premium',
    price: 19.99,
    credits: 300,
    features: [
      '300 AI queries per month',
      'Access to all content',
      'All calculators',
      'Priority support',
      'Unlimited saved questions',
      'AI memory (30 days)',
      'Voice assistant',
    ],
  },
  {
    name: 'Pro',
    price: 39.99,
    credits: 1000,
    features: [
      '1000 AI queries per month',
      'Access to all content',
      'All calculators',
      '24/7 priority support',
      'Unlimited saved questions',
      'AI memory (90 days)',
      'Voice assistant',
      'Custom AI training',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Pricing' }]} />
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Select the plan that works best for you. Credits are deducted for AI queries, image uploads, and memory usage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-lg shadow-lg border-2 ${
              plan.name === 'Premium'
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="mb-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              {plan.price > 0 && <span className="text-gray-600 dark:text-gray-400">/month</span>}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {plan.credits} credits per month
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                plan.name === 'Premium'
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {plan.price === 0 ? 'Get Started' : 'Subscribe'}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Credit System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">AI Queries</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              1 credit per query
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Image Uploads</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              2 credits per upload
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Memory Storage</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              0.1 credits per MB per month
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
