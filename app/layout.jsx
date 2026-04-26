import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: "Vastraa - Custom T-Shirt Printing | Premium Quality Apparel",
  description: "Design and order custom printed t-shirts with Vastraa. High-quality printing, fast delivery, and endless design possibilities for your unique style.",
  keywords: "custom t-shirts, t-shirt printing, personalized apparel, custom clothing, Vastraa",
  authors: [{ name: "Vastraa Team" }],
  openGraph: {
    title: "Vastraa - Custom T-Shirt Printing",
    description: "Premium quality custom t-shirt printing service",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
