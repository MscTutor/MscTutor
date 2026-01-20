import Breadcrumbs from '@/components/Breadcrumbs'
import { adminDb } from '@/lib/firebase-admin'
import { UserRole } from '@/lib/firebase-collections'

export default async function AdminUsersPage() {
  // Fetch users from Firebase
  const usersSnapshot = await adminDb.collection('users').limit(50).get()
  const users = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Users' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-8">Manage Users</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Credits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <div className="font-semibold">{user.displayName || 'User'}</div>
                  <div className="text-sm text-gray-500">{user.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
                    {user.role || UserRole.REGISTERED}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.credits || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.subscriptionPlan || 'free'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-primary-600 hover:text-primary-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
