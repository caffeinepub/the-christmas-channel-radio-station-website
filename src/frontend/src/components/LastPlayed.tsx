import { History } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function LastPlayed() {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-green to-christmas-gold flex items-center justify-center">
            <History className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-christmas-green uppercase tracking-wide">
              Recently Played
            </p>
            <h3 className="text-2xl font-bold text-christmas-dark mt-1 font-christmas">
              Last Played Songs
            </h3>
          </div>
        </div>
        
        {/* Embedded Live365 Last Played Player */}
        <div className="flex justify-center">
          <div className="w-full max-w-[450px] rounded-lg overflow-hidden border-2 border-christmas-gold/30 shadow-md">
            <iframe
              width="100%"
              height="511"
              frameBorder="0"
              src="https://live365.com/embeds/v1/played/a76054?s=md&m=dark"
              title="Live365 Last Played Songs"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
