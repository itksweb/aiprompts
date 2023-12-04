//import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/AuthContext";
import Nav from "./components/Nav";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
