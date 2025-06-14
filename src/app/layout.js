
import "./globals.css";
import Navbar from '../components/navbar'



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
