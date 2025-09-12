import { MapPin, Phone, Mail, Calendar, Facebook, Instagram, MessageCircle } from 'lucide-react';
import aanganLogo from '@/assets/aangan-logo.png';

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={aanganLogo} 
                alt="Aangan Exhibition Logo" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold bg-gradient-accent bg-clip-text text-transparent">
                  आगण Exhibition
                </h3>
                <p className="text-xs text-muted-foreground">The Grand Exhibition</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Celebrating culture, arts, and heritage through magnificent exhibitions that bring communities together.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 9270135692</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>aanganexhibition@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Lig 64,8/2, Near SSC Board office, Tope nagar, Amravati-444602</span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Next Exhibition</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>OCT 10-11, 2025</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Hotel Mehfil Inn, Camp Road, Amravati.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © 2025 Aangan Exhibition. All rights reserved.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a 
                href="https://www.facebook.com/share/1CN89HaZ7V/?mibextid=wwXIfr " 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
              >
                <Facebook size={50} strokeWidth={2.25} />
              </a>
              <a 
                href="https://www.instagram.com/aangan_exhibition?igsh=YnQzN2w4cTE4MHZu&utm_source=qr " 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
              >
                <Instagram size={50} strokeWidth={2.25} />
              </a>
              <a 
                href="https://wa.me/919270135692" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
              >
                <MessageCircle size={50} strokeWidth={2.25} />
              </a>
            </div>
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





