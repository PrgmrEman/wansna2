import emailjs from "@emailjs/browser";

export async function sendFeedback(name, message) {
  const now = new Date();

  const currentTime = now.toLocaleString("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  });

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name,
      time: currentTime,
      message,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}