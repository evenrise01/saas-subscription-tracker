export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
      <footer className="p-4">
        {/* Footer content */}
      </footer>
    </div>
  )
}