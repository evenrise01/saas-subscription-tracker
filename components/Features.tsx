import { Calendar, CreditCard, Bell } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Track Renewal Dates",
    description: "Never miss a renewal date with our smart calendar integration.",
  },
  {
    icon: CreditCard,
    title: "Expense Management",
    description: "Easily categorize and track your subscription expenses.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get timely reminders for upcoming payments and renewals.",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <feature.icon className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

