import { ThemeProvider } from "@/provider/themeProvider"
import classNames from 'classnames';
import './global.css';
import { cn } from "@/lib/utils";
import ClientProvider from "@/provider/clientProvider";

export const metadata = {
  title: 'Metap',
  description: 'In Political Science Meeting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('text-gray-600 dark:text-gray-200')}>
      <ClientProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </ClientProvider>
      </body>
    </html>
  );
}
