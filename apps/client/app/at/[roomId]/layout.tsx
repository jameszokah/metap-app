
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
    <html lang="en" className="fSize">
      <body className="w-screen h-screen bg-dark-primary">{children}</body>
    </html>
  );
}
