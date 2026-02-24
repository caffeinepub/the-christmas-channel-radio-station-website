import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, LogIn, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/djs', label: 'DJs' },
    { path: '/requests', label: 'Requests' },
    { path: '/about', label: 'About' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin' });
  }

  const isActive = (path: string) => currentPath === path || (path === '/admin' && currentPath.startsWith('/admin'));

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-christmas-red/95 backdrop-blur-sm border-b-4 border-christmas-gold shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/assets/generated/christmas-channel-logo-transparent.dim_200x200.png" 
                alt="The Christmas Channel" 
                className="h-14 w-14 transition-transform group-hover:scale-110"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white font-christmas tracking-wide">
                The Christmas Channel
              </h1>
              <p className="text-xs text-christmas-gold font-medium">Your Holiday Music Station</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-christmas-gold text-christmas-red shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label === 'Admin' && <Shield className="h-4 w-4" />}
                {item.label}
              </Link>
            ))}
            <Button
              onClick={handleAuth}
              disabled={disabled}
              variant="ghost"
              size="sm"
              className={`ml-2 ${
                isAuthenticated
                  ? 'text-white hover:bg-white/10'
                  : 'bg-christmas-gold text-christmas-red hover:bg-christmas-gold-light'
              }`}
            >
              {disabled ? (
                'Loading...'
              ) : isAuthenticated ? (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-christmas-gold text-christmas-red'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label === 'Admin' && <Shield className="h-4 w-4" />}
                {item.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                handleAuth();
                setMobileMenuOpen(false);
              }}
              disabled={disabled}
              className={`w-full ${
                isAuthenticated
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-christmas-gold text-christmas-red hover:bg-christmas-gold-light'
              }`}
            >
              {disabled ? (
                'Loading...'
              ) : isAuthenticated ? (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
