import RadioPlayer from '../components/RadioPlayer';
import NowPlaying from '../components/NowPlaying';
import LastPlayed from '../components/LastPlayed';
import WaysToListen from '../components/WaysToListen';
import OnAirDisplay from '../components/OnAirDisplay';
import UpcomingShows from '../components/UpcomingShows';
import ChristmasCountdown from '../components/ChristmasCountdown';
import PublicWeatherForecast from '../components/PublicWeatherForecast';
import ScrollingBanner from '../components/ScrollingBanner';
import { Calendar, Users, Radio } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetThemeSettings } from '../hooks/useQueries';

export default function HomePage() {
  const { data: themeSettings } = useGetThemeSettings();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Countdown */}
      <section className="relative mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.jpg"
            alt="The Christmas Channel"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/90 to-christmas-green/80 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-christmas drop-shadow-lg">
                Welcome to The Christmas Channel
              </h1>
              <p className="text-xl md:text-2xl font-medium drop-shadow-md">
                Your 24/7 Holiday Music Station
              </p>
            </div>
          </div>
        </div>
        
        {/* Christmas Countdown Timer - conditionally rendered */}
        {themeSettings?.showCountdown !== false && <ChristmasCountdown />}
      </section>

      {/* Player, Now Playing, Last Played, On Air Display, and Upcoming Shows */}
      <section className="space-y-6 mb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-christmas-dark mb-4 font-christmas">
              🎄 Listen Live
            </h2>
            <RadioPlayer />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-christmas-dark mb-4 font-christmas">
              🎵 Now Playing
            </h2>
            <NowPlaying />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-christmas-dark mb-4 font-christmas">
              📻 On Air
            </h2>
            <OnAirDisplay />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-christmas-dark mb-4 font-christmas">
              🕒 Last Played
            </h2>
            <LastPlayed />
          </div>
        </div>
        <div>
          <UpcomingShows />
        </div>
      </section>

      {/* Public Weather Forecast */}
      <PublicWeatherForecast />

      {/* Ways to Listen Section */}
      <section className="mb-16">
        <WaysToListen />
      </section>

      {/* Quick Links */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 hover:shadow-xl transition-shadow">
          <div className="p-6 text-center">
            <div className="h-16 w-16 rounded-full bg-christmas-red mx-auto mb-4 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
              Program Schedule
            </h3>
            <p className="text-gray-600 mb-4">
              Check out our daily festive programming lineup
            </p>
            <Button asChild className="bg-christmas-red hover:bg-christmas-red-dark">
              <Link to="/schedule">View Schedule</Link>
            </Button>
          </div>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-christmas-green border-2 hover:shadow-xl transition-shadow">
          <div className="p-6 text-center">
            <div className="h-16 w-16 rounded-full bg-christmas-green mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
              Meet Our DJs
            </h3>
            <p className="text-gray-600 mb-4">
              Get to know the voices behind the music
            </p>
            <Button asChild className="bg-christmas-green hover:bg-christmas-green-dark">
              <Link to="/djs">Meet the Team</Link>
            </Button>
          </div>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-shadow">
          <div className="p-6 text-center">
            <div className="h-16 w-16 rounded-full bg-christmas-gold mx-auto mb-4 flex items-center justify-center">
              <Radio className="h-8 w-8 text-christmas-red" />
            </div>
            <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
              Request a Song
            </h3>
            <p className="text-gray-600 mb-4">
              Send us your favorite holiday tune request
            </p>
            <Button asChild className="bg-christmas-gold hover:bg-christmas-gold-light text-christmas-red">
              <Link to="/requests">Make a Request</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Featured Image */}
      <section className="text-center mb-16">
        <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl inline-block">
          <div className="p-8">
            <img
              src="/assets/generated/vintage-mic.dim_400x400.jpg"
              alt="Vintage Microphone"
              className="w-64 h-64 object-cover rounded-lg shadow-lg mx-auto"
            />
            <p className="mt-4 text-christmas-dark font-medium italic">
              "Spreading holiday cheer through music since 2025"
            </p>
          </div>
        </Card>
      </section>

      {/* Scrolling Banner */}
      <ScrollingBanner />
    </div>
  );
}
