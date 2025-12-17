export async function rtiTemplate(payload) {

  const apiUrl = import.meta.env.VITE_API_URL || "https://api.focasedu.com";
  const response = await fetch(
    `${apiUrl}/api/whatsapp/rti-template`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return response.json();
}
