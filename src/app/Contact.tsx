"use client"
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });


  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div id="contact" className="text-zinc-600 bg-gray-300 py-5">
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
      />
      <div className="text-center text-3xl md:text-5xl md:py-10">Contact Us!</div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-1/2 my-auto px-10 md:space-y-2">
          <div className="flex text-left text-lg md:text-xl items-center space-x-3">
            <i className="p-5 rounded-full text-3xl md:text-4xl uil uil-map-marker"></i>
            <p>Tunisia, Sousse, Sahloul</p>
          </div>
          <div className="flex text-left text-lg md:text-xl items-center space-x-3">
            <i className="p-5 rounded-full text-3xl md:text-4xl uil uil-phone"></i>
            <p>55 555 555</p>
          </div>
          <div className="flex text-left text-lg md:text-xl items-center space-x-3">
            <i className="p-5 rounded-full text-3xl md:text-4xl uil uil-mailbox"></i>
            <p>contact@gmail.com</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 space-y-5 p-4 md:p-12">
          {success && <p className="text-zinc-600 text-center text-lg mt-2">Message sent successfully!</p>}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3"
            placeholder="Enter your name ..."
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3"
            placeholder="Enter your email ..."
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3 h-60"
            placeholder="Enter your message ..."
          />
          <button
            className="rounded-xl bg-gray-600 disabled:bg-gray-400 text-zinc-300 p-3 w-fit disabled:hover:scale-100 hover:scale-125 duration-300"
            type='submit'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
