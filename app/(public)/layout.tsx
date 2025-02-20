export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <nav className="p-4 border-b">
        {/* Public navigation */}
      </nav>
      {children}
      <footer className="p-4 border-t">
        {/* Footer content */}
      </footer>
    </div>
  )
}