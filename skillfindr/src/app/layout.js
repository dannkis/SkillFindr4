import './globals.scss';

import { Providers } from './providers';

export const metadata = {
  title: 'SkillFindr',
  description: 'SkillFindr Chatbot - IBM Carbon with NextJS 13',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
