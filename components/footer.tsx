import Link from "next/link"

const footerLinks = [
  { name: "About", href: "#" },
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">SubSync</h2>
          <p className="text-gray-600">Simplify your subscriptions</p>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-gray-600 hover:text-gray-900">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-8 text-center text-gray-500">© {new Date().getFullYear()} SubSync. All rights reserved.</div>
    </footer>
  )
}

