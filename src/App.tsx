import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'react-hot-toast';
import { Send, Mail, Clock, MessageSquare, Dumbbell, Users, Calendar } from 'lucide-react';
import gymlogo from './gym-final-removebg.png'

// Type definitions for environment variables
declare global {
  interface ImportMetaEnv {
    VITE_EMAILJS_SERVICE_ID: string;
    VITE_EMAILJS_TEMPLATE_ID: string;
    VITE_EMAILJS_PUBLIC_KEY: string;
  }
}

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('contact');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || 
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 
        !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      toast.error('EmailJS configuration is missing');
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully!');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Toaster position="top-center" />
      
      {/* Header Section */}
      <header className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={gymlogo}
            alt="GymMatrix Logo" 
            className="w-48 h-48 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-red-600 mb-2">GymMatrix</h1>
          <p className="text-xl text-gray-300 mb-8">Support Center</p>
          
          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveSection('about')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeSection === 'about' ? 'bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              About App
            </button>
            <button
              onClick={() => setActiveSection('faq')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeSection === 'faq' ? 'bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeSection === 'contact' ? 'bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              Contact Support
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* About Section */}
          {activeSection === 'about' && (
            <div className="bg-zinc-800 p-8 rounded-lg shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-red-600 mb-6">About GymMatrix</h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  GymMatrix is your ultimate fitness companion, designed to transform your workout 
                  experience with advanced tracking, personalized routines, and professional guidance.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-zinc-700 rounded-lg text-center">
                    <Dumbbell className="w-8 h-8 text-red-600 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">Workout Tracking</h3>
                    <p className="text-gray-300">Advanced progress monitoring and analytics</p>
                  </div>
                  <div className="p-6 bg-zinc-700 rounded-lg text-center">
                    <Users className="w-8 h-8 text-red-600 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">Personal Training</h3>
                    <p className="text-gray-300">Connect with certified fitness experts</p>
                  </div>
                  <div className="p-6 bg-zinc-700 rounded-lg text-center">
                    <Calendar className="w-8 h-8 text-red-600 mx-auto mb-4" />
                    <h3 className="font-bold text-white mb-2">Custom Plans</h3>
                    <p className="text-gray-300">Personalized workout schedules</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <div className="bg-zinc-800 p-8 rounded-lg shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="p-6 bg-zinc-700 rounded-lg">
                  <h3 className="font-bold text-white mb-2">How do I get started with GymMatrix?</h3>
                  <p className="text-gray-300">
                    Download the app, create an account with your email, and verify your account 
                    through the confirmation code sent to your email. Once verified, you can start 
                    building your fitness profile.
                  </p>
                </div>
                <div className="p-6 bg-zinc-700 rounded-lg">
                  <h3 className="font-bold text-white mb-2">How can I track my progress?</h3>
                  <p className="text-gray-300">
                    GymMatrix offers comprehensive tracking features including workout logs, 
                    body measurements, and performance metrics. Access your dashboard to view 
                    detailed progress charts and analytics.
                  </p>
                </div>
                <div className="p-6 bg-zinc-700 rounded-lg">
                  <h3 className="font-bold text-white mb-2">What devices are supported?</h3>
                  <p className="text-gray-300">
                    GymMatrix is available on both iOS and Android devices. For the best 
                    experience, ensure your device is running the latest operating system version.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form Section */}
          {activeSection === 'contact' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-800 p-6 rounded-lg text-center">
                  <Mail className="w-8 h-8 text-red-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Email Support</h3>
                  <p className="text-gray-300">support@gymmatrix.com</p>
                </div>
                <div className="bg-zinc-800 p-6 rounded-lg text-center">
                  <Clock className="w-8 h-8 text-red-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Response Time</h3>
                  <p className="text-gray-300">Within 24 hours</p>
                </div>
                <div className="bg-zinc-800 p-6 rounded-lg text-center">
                  <MessageSquare className="w-8 h-8 text-red-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Support Hours</h3>
                  <p className="text-gray-300">Mon-Fri, 9AM-5PM EST</p>
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 bg-zinc-800 p-8 rounded-lg shadow-xl"
              >
                <h2 className="text-2xl font-bold text-red-600 mb-6">Contact Support</h2>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;