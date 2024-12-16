"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BackButton from "../../BackButton";
import Accordion from "../Accordion";
import Footer from "../../Footer";
import Loading from "../../Loading";

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_API_VERSION = "2024-12-15";
const SANITY_TOKEN = process.env.NEXT_PUBLIC_SANITY_TOKEN;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_VERSION || !SANITY_TOKEN) {
  console.error("Sanity environment variables are missing. Check your .env.local file.");
}

interface FormData {
  name: string;
  email: string;
  amount: number;
  service: string;
}

interface Service {
  _id: string;
  name: string;
  price: number;
}

export default function Payment({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const [wait, setWait] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ name: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    amount: 0,
    service: "",
  });

  const handleError = () => {
    router.push(`/error?message=An unexpected error occurred. Please try again later.`);
  };

  useEffect(() => {
    setMounted(true);

    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch (err) {
        console.error(err);
        handleError();
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const query = encodeURIComponent(`*[_type == "service"]{_id, name, price}`);
        const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${SANITY_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services. Please try again later.");
        }

        const data = await response.json();
        setServices(data.result);
      } catch (err: unknown) {
        console.error(err);
        handleError();
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0 && resolvedParams) {
      const matchedService = services.find(
        (service) => service.name === resolvedParams.name
      );
      if (matchedService) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          amount: matchedService.price || 0,
          service: matchedService.name,
        }));
      }
    }
  }, [services, resolvedParams]);

  useEffect(() => {
    if (session?.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: session.user?.name || "",
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  if (!mounted || !resolvedParams) {
    return null;
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    setWait(true);
    e.preventDefault();

    if (!session) {
      window.location.href = "../Profile";
      return;
    }

    const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL;

    try {
      const response = await axios.post<{ paymentUrl: string }>(`${FLASK_API_URL}/api/create-payment`, formData);

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        handleError();
      }
    } catch (err: any) {
      console.error(err);
      handleError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-300 text-zinc-600">
      <BackButton />
      <h1 className="text-center py-10 text-5xl">
        {resolvedParams.name || "Loading service name..."}
      </h1>
      <div className="mx-auto w-2/3 rounded-lg">
        <Accordion
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
        <Accordion
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
        <Accordion
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </div>

      <div className="flex justify-center">
        <button
          className="p-5 rounded-2xl w-fit my-10 bg-zinc-600 disabled:bg-zinc-400 duration-500 text-gray-300"
          type="submit"
          disabled={wait}
        >
          Reserve session {formData.amount || "N/A"}dt
        </button>
      </div>
      <Footer />
    </form>
  );
}
