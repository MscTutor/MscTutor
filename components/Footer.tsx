import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">MscTutor</h3>
            <p className="text-sm mb-2">
              Your complete learning platform for Math, Science & Commerce
            </p>
            <p className="text-sm text-gray-400">
              Dola, Madhya Pradesh, India
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Email: <a href="mailto:help.msctutor@gmail.com" className="hover:text-white">help.msctutor@gmail.com</a>
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/classes" className="hover:text-white">Classes</Link></li>
              <li><Link href="/subjects" className="hover:text-white">Subjects</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/support" className="hover:text-white">Support</Link></li>
              <li><Link href="/feedback" className="hover:text-white">Feedback</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/dmca" className="hover:text-white">DMCA</Link></li>
              <li><Link href="/attribution" className="hover:text-white">Attribution</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MscTutor. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Author: Riyaz Mohammad | Dola, Madhya Pradesh, India</p>
        </div>
      </div>
    </footer>
  )
}
