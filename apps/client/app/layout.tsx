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
      <body>{children}</body>
    </html>
  );
}
