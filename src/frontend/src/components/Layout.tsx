import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';
import Snowflakes from './Snowflakes';
import { useGetThemeSettings } from '../hooks/useQueries';

export default function Layout() {
  const { data: themeSettings } = useGetThemeSettings();

  const getBackgroundImage = () => {
    if (!themeSettings) return '/assets/generated/christmas-background.dim_1920x1080.jpg';
    
    switch (themeSettings.backgroundImage) {
      case 'snowyVillage':
        return '/assets/generated/snowy-village-background.dim_1920x1080.jpg';
      case 'twinklingLights':
        return '/assets/generated/twinkling-lights-background.dim_1920x1080.jpg';
      case 'festiveTree':
        return '/assets/generated/festive-tree-background.dim_1920x1080.jpg';
      default:
        return '/assets/generated/christmas-background.dim_1920x1080.jpg';
    }
  };

  return (
    <div 
      className="relative min-h-screen"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            oklch(0.96 0.02 25 / 0.85) 0%,
            oklch(0.98 0.01 85 / 0.75) 20%,
            oklch(0.97 0.015 155 / 0.7) 40%,
            oklch(0.98 0.01 85 / 0.75) 60%,
            oklch(0.96 0.02 25 / 0.8) 80%,
            oklch(0.95 0.02 25 / 0.85) 100%
          ),
          url(${getBackgroundImage()})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {themeSettings?.snowEnabled !== false && <Snowflakes />}
      
      {/* Christmas decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Shimmering light overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-christmas-gold/5 via-transparent to-christmas-gold/5 animate-shimmer" />
        
        {/* Top garland decoration */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-christmas-green/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green opacity-60" />
        
        {/* Corner ornaments */}
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-christmas-red/40 blur-sm animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-christmas-gold/40 blur-sm animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-12 left-12 w-6 h-6 rounded-full bg-christmas-green/40 blur-sm animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute top-12 right-12 w-6 h-6 rounded-full bg-christmas-red/40 blur-sm animate-pulse" style={{ animationDuration: '3.5s' }} />
      </div>
      
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
