// src/app/api/submitContact/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset
  apiVersion: '2024-12-15', // Use your API version
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN!, // Add your Sanity token
  useCdn: false,
});

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    await client.create({
      _type: 'contact',
      name,
      email,
      message,
    });

    return NextResponse.json({ message: 'Contact submission successful' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
