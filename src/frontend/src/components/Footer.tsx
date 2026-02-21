import { Heart } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-christmas-dark text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-christmas-gold mb-4 font-christmas">
              The Christmas Channel
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Broadcasting festive cheer 24/7 with your favorite holiday classics and modern Christmas hits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-christmas-gold mb-4 font-christmas">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-christmas-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/schedule" className="text-gray-300 hover:text-christmas-gold transition-colors">
                  Schedule
                </a>
              </li>
              <li>
                <a href="/djs" className="text-gray-300 hover:text-christmas-gold transition-colors">
                  Our DJs
                </a>
              </li>
              <li>
                <a href="/requests" className="text-gray-300 hover:text-christmas-gold transition-colors">
                  Song Requests
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-christmas-gold mb-4 font-christmas">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-christmas-gold flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-christmas-gold flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-christmas-gold flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-2">
            © 2025. Built with <Heart className="h-4 w-4 text-christmas-red fill-christmas-red" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-christmas-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
