import { ThemeProvider } from "@/provider/themeProvider"
import classNames from 'classnames';
import './global.css';

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
      <body className={classNames('')}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
