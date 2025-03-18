
import React from 'react';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 bg-cozy-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cozy-900">Get in Touch</h2>
          <p className="text-lg text-cozy-700">
            Have a project in mind? We'd love to hear about it and discuss how we can help bring your vision to life.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cozy-900 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-cozy-200 rounded-md focus:ring-cozy-500 focus:border-cozy-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cozy-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-cozy-200 rounded-md focus:ring-cozy-500 focus:border-cozy-500"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-cozy-900 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-cozy-200 rounded-md focus:ring-cozy-500 focus:border-cozy-500"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-cozy-900 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-cozy-200 rounded-md focus:ring-cozy-500 focus:border-cozy-500"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-cozy-800 hover:bg-cozy-900 text-white px-8"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
