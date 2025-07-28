import Link from "next/link";
import {
  FaCode,
  FaRocket,
  FaBrain,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

export default function NotLoggedIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative pt-20 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-8 text-center mb-20">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
            <FaBrain className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            About CraftAI
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Revolutionizing the way developers create, learn, and build with the
            power of artificial intelligence. Transform your ideas into
            beautiful, functional code in seconds.
          </p>

          {/* Login CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/login"
              className="group flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
            >
              Get Started Today
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/register"
              className="px-7 py-3 border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white rounded-full font-semibold text-base transition-all duration-300 hover:bg-blue-500/10"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 sm:px-8 mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            What Makes CraftAI Special?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">
                AI-Powered Code Generation
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Generate clean, efficient code in multiple languages with our
                advanced AI models. From simple functions to complex
                applications.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Lightning Fast
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get instant results with our optimized AI infrastructure. No
                more waiting - your code is ready in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Community Driven
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Join thousands of developers who trust CraftAI for their daily
                coding needs. Share, learn, and grow together.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="container mx-auto px-4 sm:px-8 mb-20">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
              We believe that everyone should have access to powerful
              development tools. CraftAI democratizes coding by making it
              accessible, intuitive, and enjoyable for developers of all skill
              levels.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <span className="px-4 py-2 bg-gray-700/50 rounded-full">
                🚀 Innovation
              </span>
              <span className="px-4 py-2 bg-gray-700/50 rounded-full">
                🤝 Collaboration
              </span>
              <span className="px-4 py-2 bg-gray-700/50 rounded-full">
                💡 Creativity
              </span>
              <span className="px-4 py-2 bg-gray-700/50 rounded-full">
                🎯 Excellence
              </span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
              Ready to Transform Your Development Workflow?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto">
              Join the revolution and experience the future of coding with
              CraftAI. Start building amazing projects today.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
            >
              Start Your Journey
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
