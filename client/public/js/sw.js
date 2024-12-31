self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({});
});
