import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Music, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetNowPlaying, useUpdateNowPlaying, useClearNowPlaying } from '../../hooks/useQueries';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function ManageNowPlaying() {
  const { data: nowPlaying, isLoading } = useGetNowPlaying();
  const updateNowPlaying = useUpdateNowPlaying();
  const clearNowPlaying = useClearNowPlaying();

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
  });

  useEffect(() => {
    if (nowPlaying) {
      setFormData({
        title: nowPlaying.title,
        artist: nowPlaying.artist,
      });
    }
  }, [nowPlaying]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.artist.trim()) {
      toast.error('Please fill in both title and artist');
      return;
    }

    try {
      await updateNowPlaying.mutateAsync({
        title: formData.title.trim(),
        artist: formData.artist.trim(),
      });
      toast.success('Now Playing updated successfully!');
    } catch (error: any) {
      console.error('Error updating now playing:', error);
      toast.error(error.message || 'Failed to update Now Playing');
    }
  };

  const handleClear = async () => {
    try {
      await clearNowPlaying.mutateAsync();
      setFormData({ title: '', artist: '' });
      toast.success('Now Playing cleared successfully!');
    } catch (error: any) {
      console.error('Error clearing now playing:', error);
      toast.error(error.message || 'Failed to clear Now Playing');
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4 text-christmas-red hover:text-christmas-red-dark">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-christmas-dark mb-2 font-christmas">
            Update Now Playing
          </h1>
          <p className="text-gray-600">Update the current song information in real-time</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-christmas-gold/10 flex items-center justify-center">
                  <Music className="h-8 w-8 text-christmas-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-christmas-dark font-christmas">
                    Current Song
                  </h2>
                  <p className="text-gray-600">
                    {isLoading ? 'Loading...' : nowPlaying ? `${nowPlaying.title} - ${nowPlaying.artist}` : 'No song currently playing'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Song Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter song title"
                    className="border-christmas-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist</Label>
                  <Input
                    id="artist"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    placeholder="Enter artist name"
                    className="border-christmas-gold"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={updateNowPlaying.isPending}
                    className="flex-1 bg-christmas-gold hover:bg-christmas-gold-light text-christmas-red"
                  >
                    {updateNowPlaying.isPending ? 'Updating...' : 'Update Now Playing'}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleClear}
                    disabled={clearNowPlaying.isPending || !nowPlaying}
                    variant="outline"
                    className="border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {clearNowPlaying.isPending ? 'Clearing...' : 'Clear'}
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          <Card className="mt-6 bg-gradient-to-r from-christmas-gold/10 to-christmas-red/10 border-christmas-gold border-2">
            <div className="p-6">
              <h3 className="text-lg font-bold text-christmas-dark mb-2 font-christmas">
                💡 Quick Tips
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Updates are reflected immediately on the live site</li>
                <li>• Use "Clear" to remove the current song display</li>
                <li>• Make sure to enter both title and artist for best results</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
