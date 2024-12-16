"use client";
import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import Loading from "../Loading";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
  apiVersion: "2024-12-15",
});

const SuccessPage = () => {
  const [data, setData] = useState<any>(null);

  const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`${FLASK_API_URL}/api/get-payment-data`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          await postDataToSanity(result);
        } else {
          console.error("Failed to fetch payment data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    interface Payment {
      name: string;
      email: string;
      amount: number;
      service: string;
    }

    const postDataToSanity = async (paymentData: Record<string, Payment>) => {
      try {
        const entries = Object.entries(paymentData);

        for (const [email, payment] of entries) {

          const query = `*[_type == "history" && name == $name && amount == $amount && service == $service][0]`;
          const params = {
            name: payment.name,
            amount: payment.amount,
            service: payment.service,
          };

          const existingEntry = await sanityClient.fetch(query, params);

          if (existingEntry) {
            console.log(`Entry for ${payment.name} already exists.`);
            continue;
          }

          await sanityClient.create({
            _type: "history",
            name: payment.name,
            email: payment.email,
            amount: payment.amount,
            service: payment.service,
          });

          console.log(`Successfully added entry for ${payment.name}.`);
        }
      } catch (error) {
        console.error("Error posting data to Sanity:", error);
      }
    };

    fetchPaymentData();
  }, []);

  if (!data) return <div><Loading /></div>;

  return (
    <div>
      <BackButton />
      <div className="bg-gray-300 text-zinc-600 min-h-screen flex justify-center items-center p-4">
        <span className="text-center">
          <i className="text-5xl sm:text-6xl md:text-7xl uil uil-check-circle"></i>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-4">The payment success</h1>
        </span>
      </div>
    </div>
  );
};

export default SuccessPage;
