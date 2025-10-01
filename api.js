export const url = "https://uhuiorndhqpwghpjonfq.supabase.co/rest/v1/";
export const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVodWlvcm5kaHFwd2docGpvbmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzEzOTksImV4cCI6MjA3NDcwNzM5OX0.-SS85L6QSIMuRyaiUGDKBh5S09fLEONiLv28gSx93lY";

/** Fetch helpers */
const baseHeaders = {
  apikey: apiKey,
  Authorization: `Bearer ${apiKey}`,
};

export const getContacts = async () => {
  const res = await fetch(url + "contacts", {
    headers: baseHeaders,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch contacts: ${res.status} ${text}`);
  }
  return res.json(); // array of contacts
};


export const addContact = async (data) => {
  const res = await fetch(url + "contacts", {
    method: "POST",
    headers: {
      ...baseHeaders,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data), // Supabase REST accepts single object
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add contact: ${res.status} ${text}`);
  }

  const rows = await res.json(); // array with one element
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("Supabase did not return the created row.");
  }
  return rows[0];
};
