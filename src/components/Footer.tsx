import { Code2 } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 bg-dark-950 border-t border-dark-800">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-primary-500" />
          <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            &lt;AQ/&gt;
          </span>
        </div>
        <p className="text-gray-400 mb-2">
          &copy; {currentYear} AbdulQader Qassab. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm">
          Built with React, TypeScript, Tailwind CSS & Framer Motion
        </p>
      </div>
    </footer>
  )
}
