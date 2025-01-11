const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const saveSubscription = async (subscription) => {
  const res = await fetch(
    "https://express-crash-82yx.onrender.com/api/save-subscription",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    }
  );
  return await res.json();
};

self.addEventListener("activate", async () => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BDaWA7suSh7L68U49m1dtO0deUksIcWLgsYcO5lAltrIObiNOaD3IFpbhXKedmylKXS6MHW8jFSLuOtkerpMcf4"
    ),
  });
  const res = await saveSubscription(subscription);
  console.log(res);
});

self.addEventListener("push", async (e) => {
  const data = e.data.text();
  const options = {
    body: data,
    icon: "../assets/logo.jpg",
  };
  await self.registration.showNotification(
    "Reminder from Task Manager.",
    options
  );
});

// Public Key:
// BDaWA7suSh7L68U49m1dtO0deUksIcWLgsYcO5lAltrIObiNOaD3IFpbhXKedmylKXS6MHW8jFSLuOtkerpMcf4

// Private Key:
// 4aWKgdC2BewEueSE_NiHHEX1pCziNE-0dssp38u9HmA
