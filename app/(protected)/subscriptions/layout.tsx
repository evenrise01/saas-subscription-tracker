export default function SubscriptionsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          {/* Common subscription filters/search */}
        </div>
        {children}
      </div>
    )
  }