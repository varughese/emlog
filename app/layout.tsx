import '../styles/globals.css'

import { Header } from '../components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Emlog</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body>
        <div className="px-6">{children}</div>
      </body>
    </html>
  )
}
