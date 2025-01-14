import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Oswald, Roboto } from 'next/font/google'
import { shadesOfPurple } from "@clerk/themes";
import Provider from "./provider";



export const metadata = {
  title: {
    template: "%s | Interior",
    default: "Interior Design AI",
  },
  description: "Interior Design App made with Love and AI",
};

const oswald = Oswald({ subsets: ['latin'] })
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {


  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#000",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-indigo-800 hover:bg-indigo-900 text-white",
          card: "gradient-background2",
          headerTitle: "text-indigo-800",
          headerSubtitle: "text-purple-700",
        },
      }}
    >
      <html lang="en">
        <body className={`${oswald.className} ${roboto.className}`}>
          <div className="animated-bg" />
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
