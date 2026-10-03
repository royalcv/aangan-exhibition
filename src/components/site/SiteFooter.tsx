import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import aanganLogo from '@/assets/aangan-logo.webp';
import { editions, getNextEdition } from '@/data/editions';
import { site } from '@/data/site';

const iconLink =
  'flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:border-primary hover:text-primary';

const SiteFooter = () => {
  const next = getNextEdition();
  const listed = next ? editions.filter((edition) => new Date(edition.endDate) > new Date()) : [];

  return (
    <footer className="ink-band on-ink">
      <div className="dot-rule" aria-hidden="true" />
      <div className="page-wrap grid gap-12 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={aanganLogo} alt="" width={48} height={48} className="h-12 w-12 rounded-full bg-white/10 object-contain p-1" />
            <p className="font-display text-3xl text-primary">आंगण</p>
          </div>
          <p className="mt-4 max-w-xs text-white/80">
            A stage for Amravati's women entrepreneurs, artisans and homegrown brands.
          </p>
          <p className="mt-3 text-sm text-white/60">{site.registration}</p>
        </div>

        <div>
          <h2 className="text-xl text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-white/85">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center gap-3 hover:text-primary">
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-3 break-all hover:text-primary">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3 py-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-white">{listed.length > 1 ? 'Next editions' : 'Next edition'}</h2>
          {listed.length > 0 ? (
            <ul className="mt-4 space-y-4 text-white/85">
              {listed.map((edition) => (
                <li key={edition.id}>
                  <p className="font-semibold text-white">{edition.dateLabel}</p>
                  <p>
                    {edition.venue}, {edition.area}
                  </p>
                  <a
                    href={edition.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-primary underline underline-offset-4 hover:text-white"
                  >
                    Get directions
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-white/85">The next edition's dates will be announced soon. Follow us to hear first.</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="page-wrap flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} Aangan Exhibition. All rights reserved.</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 text-sm text-white/85">
            <Link to="/about" className="inline-flex min-h-11 items-center hover:text-primary">
              About
            </Link>
            <Link to="/videos" className="inline-flex min-h-11 items-center hover:text-primary">
              Videos
            </Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex gap-3">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Aangan on Facebook" className={iconLink}>
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Aangan on Instagram" className={iconLink}>
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <WhatsAppButton iconOnly />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
