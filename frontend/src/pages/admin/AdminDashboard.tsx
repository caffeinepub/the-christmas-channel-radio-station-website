import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Music, Sparkles, Palette, Radio, RefreshCw, Mic, FileText } from 'lucide-react';
import ProtectedRoute from '../../components/ProtectedRoute';
import WeatherWidget from '../../components/WeatherWidget';
import { useRunManualUpdate, useGetLastUpdateResult } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { useState } from 'react';

export default function AdminDashboard() {
  const runManualUpdate = useRunManualUpdate();
  const { data: lastUpdateResult } = useGetLastUpdateResult();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleManualUpdate = async () => {
    setIsUpdating(true);
    try {
      const filesToUpdate = ['djProfiles', 'programSchedule', 'nowPlaying', 'songRequests', 'themeSettings'];
      const result = await runManualUpdate.mutateAsync(filesToUpdate);
      
      if (result.updateFailed) {
        toast.error('Update failed: ' + result.resultText);
      } else {
        toast.success('Manual update completed successfully!');
      }
    } catch (error: any) {
      console.error('Error running manual update:', error);
      toast.error(error.message || 'Failed to run manual update');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatUpdateTime = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString();
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-christmas-dark mb-2 font-christmas">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your Christmas radio station</p>
        </div>

        {/* Manual Update Section */}
        <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-christmas-dark font-christmas mb-1">
                  Manual Update
                </h2>
                <p className="text-gray-600">Trigger a manual refresh of all station data</p>
              </div>
              <Button
                onClick={handleManualUpdate}
                disabled={isUpdating}
                className="bg-christmas-green hover:bg-christmas-green-dark"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
                {isUpdating ? 'Updating...' : 'Run Update'}
              </Button>
            </div>
            
            {lastUpdateResult && (
              <div className={`mt-4 p-4 rounded-lg ${lastUpdateResult.updateFailed ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                <p className={`font-medium ${lastUpdateResult.updateFailed ? 'text-red-800' : 'text-green-800'}`}>
                  {lastUpdateResult.updateFailed ? '❌ Update Failed' : '✅ Last Update'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{lastUpdateResult.resultText}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatUpdateTime(lastUpdateResult.updateTime)}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Weather Widget */}
        <div className="mb-8">
          <WeatherWidget />
        </div>

        {/* Management Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/manage-djs" className="block group">
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark font-christmas">
                    Manage DJs
                  </h3>
                </div>
                <p className="text-gray-600">
                  Add, edit, or remove DJ profiles and photos
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/manage-programs" className="block group">
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-green border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark font-christmas">
                    Manage Programs
                  </h3>
                </div>
                <p className="text-gray-600">
                  Update your program schedule and show times
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/manage-now-playing" className="block group">
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-christmas-gold flex items-center justify-center">
                    <Music className="h-6 w-6 text-christmas-red" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark font-christmas">
                    Now Playing
                  </h3>
                </div>
                <p className="text-gray-600">
                  Update the currently playing song information
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/manage-theme" className="block group">
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark font-christmas">
                    Theme Settings
                  </h3>
                </div>
                <p className="text-gray-600">
                  Customize colors, backgrounds, and effects
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/manage-song-requests" className="block group">
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-green border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark font-christmas">
                    Song Requests
                  </h3>
                </div>
                <p className="text-gray-600">
                  View and manage listener song requests
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/manage-on-air" className="block group">
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-christmas-gold flex items-center justify-center">
                    <Mic className="h-6 w-6 text-christmas-red" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark font-christmas">
                    On Air Display
                  </h3>
                </div>
                <p className="text-gray-600">
                  Control what's shown in the On Air section
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/admin/manage-station-info" className="block group">
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark font-christmas">
                    Station Info
                  </h3>
                </div>
                <p className="text-gray-600">
                  Update station information and about content
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
