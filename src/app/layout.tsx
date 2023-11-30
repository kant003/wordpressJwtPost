import './globals.css'
import {Inter, Space_Grotesk, IBM_Plex_Mono} from 'next/font/google'

interface Props {
  children: React.ReactNode
}
const font = Inter({subsets: ['latin']})

export default function RootLayout({children}: Props) {
  return (
    <html lang="es">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  )
}
