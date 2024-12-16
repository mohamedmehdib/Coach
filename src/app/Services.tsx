"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Red_Hat_Display } from 'next/font/google';
import Loading from './Loading';
import {createClient} from '@sanity/client';

const red_hat = Red_Hat_Display({ subsets: ['latin'], weight: '500' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Replace with your dataset name (usually 'production')
  apiVersion: '2024-12-15', // Use the current API version
  useCdn: true, // Use CDN for faster response
});

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Sanity query to fetch services
        const query = '*[_type == "service"]';
        const data = await client.fetch(query);

        if (data.length === 0) {
          throw new Error('No services found');
        }

        setServices(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    

    fetchServices();
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-gray-300 text-gray-800 py-5 md:py-10'>
      <h1 className={'text-center py-14 md:py-20 text-5xl ' + red_hat.className}>My Services</h1>
      <div className='md:flex justify-around'>
        {services.length > 0 ? (
          services.map((item, index) => (
            <div key={index} className='shadow-2xl shadow-gray-500 p-6 mx-5 md:mx-0 md:w-1/4 space-y-10 md:hover:scale-125 duration-500 rounded-lg'>
              <h1 className='text-3xl'>{item.name}</h1>
              <p>{item.description}</p>
              <button>
                <Link href={"./Service/" + item.name} className='mt-4 bg-gray-500 px-6 py-3 rounded-lg'>
                  Select
                </Link>
              </button>
            </div>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
  );
}
