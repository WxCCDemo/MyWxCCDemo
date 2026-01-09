import { useState } from 'react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-slate-800">ACME Bank</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-slate-600 hover:text-slate-900 transition">Home</a>
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition">Features</a>
              <a href="#about" className="text-slate-600 hover:text-slate-900 transition">About</a>
              <button className="bg-slate-700 text-white px-5 py-2 rounded hover:bg-slate-800 transition">
                Open Account
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <a href="#home" className="block py-2 text-slate-600 hover:text-slate-900">Home</a>
              <a href="#features" className="block py-2 text-slate-600 hover:text-slate-900">Features</a>
              <a href="#about" className="block py-2 text-slate-600 hover:text-slate-900">About</a>
              <button className="mt-2 w-full bg-slate-700 text-white px-5 py-2 rounded hover:bg-slate-800 transition">
                Open Account
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6 leading-tight">
              Welcome to the Future of Banking
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Experience seamless digital banking with ACME Bank. Fast, secure, and designed for the modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-slate-700 text-white px-8 py-3 rounded hover:bg-slate-800 transition">
                Get Started
              </button>
              <button className="bg-white text-slate-700 px-8 py-3 rounded hover:bg-slate-100 transition border border-slate-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="order-first md:order-last">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              alt="Digital Banking Dashboard"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-3">
              Why Choose ACME Bank?
            </h2>
            <p className="text-lg text-slate-600">
              Discover the benefits of modern digital banking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded border border-slate-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop"
                alt="Security"
                className="w-full h-48 object-cover"
              />
              <div className="p-8">
                <div className="bg-slate-700 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Secure & Safe</h3>
                <p className="text-slate-600 leading-relaxed">
                  Bank-grade encryption and multi-factor authentication to keep your money safe and secure.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded border border-slate-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
                alt="Fast Transactions"
                className="w-full h-48 object-cover"
              />
              <div className="p-8">
                <div className="bg-slate-700 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Lightning Fast</h3>
                <p className="text-slate-600 leading-relaxed">
                  Instant transfers, real-time notifications, and instant account opening in minutes.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded border border-slate-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop"
                alt="No Fees"
                className="w-full h-48 object-cover"
              />
              <div className="p-8">
                <div className="bg-slate-700 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Zero Fees</h3>
                <p className="text-slate-600 leading-relaxed">
                  No monthly fees, no minimum balance, no hidden charges. Banking made simple and transparent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded border border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                  About ACME Bank
                </h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  ACME Bank is a new digital bank designed for the modern age. We believe banking should be simple, accessible, and transparent.
                </p>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Our mission is to provide world-class financial services without the complexity and fees of traditional banks.
                </p>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Join thousands of satisfied customers who have already made the switch to smarter banking.
                </p>
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <span className="text-3xl font-light text-slate-800 block">50K+</span>
                    <p className="text-slate-600 text-sm mt-1">Customers</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-light text-slate-800 block">$2B+</span>
                    <p className="text-slate-600 text-sm mt-1">Assets</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-light text-slate-800 block">24/7</span>
                    <p className="text-slate-600 text-sm mt-1">Support</p>
                  </div>
                </div>
              </div>
              <div className="h-full min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop"
                  alt="Modern Banking"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">ACME Bank</h3>
              <p className="text-slate-400 text-sm">
                The future of digital banking, today.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Checking Account</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Savings Account</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Credit Cards</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Loans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Press</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Security</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 ACME Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
