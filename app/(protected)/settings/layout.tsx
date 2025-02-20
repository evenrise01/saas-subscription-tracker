import Link from "next/link"

export default function SettingsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex gap-4">
        <nav className="w-64">
          {/* Settings navigation */}
          <ul className="space-y-2">
            <li><Link href="/settings/profile">Profile</Link></li>
            <li><Link href="/settings/notifications">Notifications</Link></li>
            <li><Link href="/settings/team">Team</Link></li>
          </ul>
        </nav>
        <div className="flex-1">
          {children}
        </div>
      </div>
    )
  }