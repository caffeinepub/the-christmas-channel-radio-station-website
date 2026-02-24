import { ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl">
          <div className="p-8 text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-christmas-red/10 mx-auto flex items-center justify-center">
              <Lock className="h-10 w-10 text-christmas-red" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-christmas-dark mb-2 font-christmas">
                Authentication Required
              </h2>
              <p className="text-gray-600">
                Please log in to access the admin dashboard.
              </p>
            </div>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-christmas-red hover:bg-christmas-red-dark text-white"
            >
              {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
          <div className="p-8 text-center">
            <div className="animate-spin h-12 w-12 border-4 border-christmas-red border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Checking permissions...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl">
          <div className="p-8 text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-christmas-red/10 mx-auto flex items-center justify-center">
              <Shield className="h-10 w-10 text-christmas-red" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-christmas-dark mb-2 font-christmas">
                Access Denied
              </h2>
              <p className="text-gray-600">
                You don't have permission to access the admin dashboard.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
