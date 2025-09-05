import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Ticketly logo" className="h-8 w-8" />
          <span className="font-semibold text-lg">Ticketly</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex gap-4 items-center">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li>
              <Link to="/"
                className="ml-2 inline-block bg-indigo-600 px-3 py-1 rounded text-sm shadow-sm hover:bg-indigo-500">
                Book Tickets
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
