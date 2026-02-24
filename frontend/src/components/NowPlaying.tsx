import { Music2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetNowPlaying } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function NowPlaying() {
  const { data: nowPlaying, isLoading } = useGetNowPlaying();

  if (isLoading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Skeleton className="h-[316px] w-full max-w-[450px]" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-red to-christmas-green flex items-center justify-center animate-pulse">
            <Music2 className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-christmas-red uppercase tracking-wide">
              Now Playing
            </p>
            {nowPlaying ? (
              <>
                <h3 className="text-2xl font-bold text-christmas-dark mt-1 font-christmas">
                  {nowPlaying.title}
                </h3>
                <p className="text-lg text-gray-600 mt-1">{nowPlaying.artist}</p>
              </>
            ) : (
              <p className="text-lg text-gray-500 mt-1 italic">
                No song currently playing
              </p>
            )}
          </div>
        </div>
        
        {/* Embedded Live365 Player */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-[450px] rounded-lg overflow-hidden border-2 border-christmas-gold/30 shadow-md">
            <iframe
              width="100%"
              height="316"
              frameBorder="0"
              src="https://live365.com/embeds/v1/player/a76054?s=md&m=dark&c=mp3"
              title="Live365 Radio Player"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

