export const api =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api"
    : "https://aiprompts-pi.vercel.app/api";
export const site_url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://aiprompts-pi.vercel.app/"
