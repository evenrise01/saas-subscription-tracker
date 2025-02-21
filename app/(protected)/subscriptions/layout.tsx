export default function SubscriptionsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        <div className="mb-4">
          {/* Common subscription filters/search */}
        </div>
        {children}
      </div>
    )
  }