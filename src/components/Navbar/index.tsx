import './index.scss'
import Link from 'next/link';

export default function Navbar() {
  return(
    <nav className="navbar">
        <h1 className="page-title">ShowFilmes</h1>

        <Link href="/" className="btn-default">
           Home
       </Link>
    </nav>
  );
}