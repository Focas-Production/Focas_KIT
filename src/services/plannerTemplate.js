export async function plannerTemplate(payload) {

   const apiUrl = import.meta.env.VITE_API_URL || "https://api.focasedu.com";

  const response = await fetch(
    `${apiUrl}/api/whatsapp/planner-template`,
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
