import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="inline-flex justify-center items-center">
      <span className="font-serif text-2xl font-bold">Emlog</span>
    </Link>
  )
}

export function Header() {
  return (
    <header className="p-8 flex justify-center">
      <Logo />
    </header>
  )
}
