import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder stream URL - replace with actual stream URL when available
  const streamUrl = 'https://stream.example.com/christmas-radio';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Playback failed:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="bg-gradient-to-br from-christmas-red to-christmas-red-dark border-christmas-gold border-2 shadow-2xl">
      <div className="p-6">
        <div className="flex items-center gap-6">
          {/* Play/Pause Button */}
          <Button
            size="lg"
            onClick={togglePlay}
            className="h-16 w-16 rounded-full bg-christmas-gold hover:bg-christmas-gold-light text-christmas-red shadow-lg transition-all hover:scale-110"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </Button>

          {/* Volume Controls */}
          <div className="flex-1 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-white hover:bg-white/10"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={(value) => {
                setVolume(value[0]);
                if (value[0] > 0) setIsMuted(false);
              }}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-white font-medium w-12 text-right">{isMuted ? 0 : volume}%</span>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm">
            {isPlaying ? '🎵 Live Broadcasting' : 'Press play to start listening'}
          </p>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={streamUrl} preload="none" />
    </Card>
  );
}
