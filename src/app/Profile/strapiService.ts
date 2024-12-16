const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

export async function emailExistsInStrapi(Email: string): Promise<boolean> {
  const response = await fetch(`${STRAPI_API_URL}/user-emails?filters[email][$eq]=${Email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch emails from Strapi');
  }

  const data = await response.json();
  return data.data.length > 0;
}

export async function addUserEmailToStrapi(name:string , email: string , service1: boolean , service2: boolean , service3: boolean ) {
  const response = await fetch(`${STRAPI_API_URL}/user-emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_KEY}`
    },
    body: JSON.stringify({
      data: {
        name : name ,
        email: email,
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add email to Strapi');
  }

  const data = await response.json();
  return data;
}