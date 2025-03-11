
import React from 'react';

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-background py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-4xl font-bold mb-10">Contact Us</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md h-32"
              placeholder="Your message"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
