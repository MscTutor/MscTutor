import { BookOpen, FileText, Calculator, FlaskConical, Image, Users, GraduationCap, Beaker } from 'lucide-react'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Admin' }]} />
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link
          href="/admin/classes"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <BookOpen className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Classes</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove classes
          </p>
        </Link>

        <Link
          href="/admin/subjects"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <BookOpen className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Subjects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove subjects
          </p>
        </Link>

        <Link
          href="/admin/chapters"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <FileText className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Chapters</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove chapters
          </p>
        </Link>

        <Link
          href="/admin/questions"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <FileText className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Questions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove questions
          </p>
        </Link>

        <Link
          href="/admin/formulas"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <Calculator className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Formulas</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove formulas
          </p>
        </Link>

        <Link
          href="/admin/experiments"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <FlaskConical className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Experiments</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove experiments
          </p>
        </Link>

        <Link
          href="/admin/media"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <Image className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Media Library</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage images and files
          </p>
        </Link>

        <Link
          href="/admin/science-branches"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <Beaker className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Science Branches</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage Physics, Chemistry, Biology, etc.
          </p>
        </Link>

        <Link
          href="/admin/books"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <BookOpen className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Books</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage NCERT and reference books
          </p>
        </Link>

        <Link
          href="/admin/exams"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <GraduationCap className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Exams</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage JEE, NEET, UPSC, State Board
          </p>
        </Link>

        <Link
          href="/admin/projects"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <Beaker className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage sample projects
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <Users className="w-12 h-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users and permissions
          </p>
        </Link>
      </div>
    </div>
  )
}
