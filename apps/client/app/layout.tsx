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
      <body className={classNames('')}>{children}</body>
    </html>
  );
}
