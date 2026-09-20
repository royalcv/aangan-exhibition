import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aanganLogo from '@/assets/aangan-logo.webp';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const socialLinks = [
    { href: 'https://www.facebook.com/share/1CN89HaZ7V/?mibextid=wwXIfr', icon: Facebook, label: 'Facebook' },
    { href: 'https://www.instagram.com/aangan_exhibition?igsh=YnQzN2w4cTE4MHZu&utm_source=qr', icon: Instagram, label: 'Instagram' },
    { href: 'https://wa.me/919270135692', icon: MessageCircle, label: 'WhatsApp' },
  ];

  return (
    <nav className="glass-strong sticky top-0 z-50 relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-accent after:opacity-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={aanganLogo}
                alt="Aangan Exhibition Logo"
                className="relative h-12 w-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                आंगण
              </h1>
              <p className="text-xs text-muted-foreground">The Grand Exhibition (Reg.No-513/2025)</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary py-2 ${
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute left-0 -bottom-0.5 h-px w-full bg-gradient-accent" />
                )}
              </Link>
            ))}

            {/* Social Media Links (Desktop) */}
            <div className="flex space-x-2 ml-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:text-primary hover:shadow-glow"
                >
                  <Icon size={18} strokeWidth={2.25} />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-up">
            <div className="glass rounded-2xl p-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Social Media Links (Mobile) */}
              <div className="flex space-x-3 pt-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:text-primary hover:shadow-glow"
                  >
                    <Icon size={18} strokeWidth={2.25} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
