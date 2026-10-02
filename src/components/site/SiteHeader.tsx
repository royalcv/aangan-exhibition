import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Facebook, Instagram, Menu, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import aanganLogo from '@/assets/aangan-logo.webp';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Videos', href: '/videos' },
  { name: 'Contact', href: '/contact' },
];

const socials = [
  { href: site.facebook, icon: Facebook, label: 'Aangan on Facebook' },
  { href: site.instagram, icon: Instagram, label: 'Aangan on Instagram' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex min-h-11 items-center border-b-2 text-base font-semibold transition-colors duration-200',
    isActive ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
  );

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="page-wrap flex h-[72px] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Aangan Exhibition, home">
          <img src={aanganLogo} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <span className="leading-tight">
            <span className="block font-display text-2xl">आंगण</span>
            <span className="block text-xs text-muted-foreground">The Grand Exhibition</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} end className={linkClass}>
              {item.name}
            </NavLink>
          ))}
          <Button asChild size="sm">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              WhatsApp us
            </a>
          </Button>
        </nav>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="!size-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,22rem)] bg-background">
            <SheetTitle className="font-display text-2xl font-normal">आंगण</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <nav aria-label="Main" className="mt-8 flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-14 items-center border-b border-border font-display text-2xl',
                      isActive ? 'text-madder' : 'text-foreground',
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            <div className="mt-8 flex items-center gap-3">
              <Button asChild>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  WhatsApp us
                </a>
              </Button>
              {socials.map(({ href, icon: Icon, label }) => (
                <Button key={label} asChild variant="outline" size="icon">
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="!size-5" aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default SiteHeader;
