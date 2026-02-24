import { Heart, Music, Radio, Users, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetStationInformation } from '../hooks/useQueries';

export default function AboutPage() {
  const { data: stationInfo, isLoading: stationInfoLoading } = useGetStationInformation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <img
            src="/assets/generated/christmas-channel-logo-transparent.dim_200x200.png"
            alt="The Christmas Channel"
            className="h-24 w-24 mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas">
            About The Christmas Channel
          </h1>
          <p className="text-xl text-gray-600">
            Spreading holiday cheer through music since 2025
          </p>
        </div>

        {/* Main Content */}
        <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl mb-8">
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to <strong className="text-christmas-red">The Christmas Channel</strong>, your
                premier destination for non-stop holiday music! We're dedicated to bringing you the best
                Christmas classics, modern holiday hits, and festive favorites 24 hours a day, 7 days a week.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Whether you're decorating the tree, wrapping presents, or just getting into the holiday
                spirit, we're here to provide the perfect soundtrack to your season. From timeless carols
                to contemporary Christmas pop, our carefully curated playlist has something for everyone.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our passionate team of DJs and music enthusiasts work around the clock to ensure you have
                the best listening experience possible. We love hearing from our listeners, so don't
                hesitate to send us your song requests and holiday greetings!
              </p>
            </div>
          </div>
        </Card>

        {/* About Station Section */}
        {stationInfo && (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-green border-2 shadow-xl mb-8">
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center shrink-0">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-christmas-dark mb-2 font-christmas">
                    {stationInfo.title}
                  </h2>
                  <p className="text-gray-600 italic mb-4">{stationInfo.description}</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: stationInfo.content }}
                />
              </div>
            </div>
          </Card>
        )}

        {stationInfoLoading && (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-green border-2 shadow-xl mb-8">
            <div className="p-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Loading station information...</p>
            </div>
          </Card>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center shrink-0">
                  <Radio className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                    24/7 Broadcasting
                  </h3>
                  <p className="text-gray-600">
                    Non-stop holiday music streaming all day, every day throughout the season.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-christmas-green border-2">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center shrink-0">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                    Curated Playlists
                  </h3>
                  <p className="text-gray-600">
                    Expertly selected songs ranging from classic carols to modern holiday hits.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-christmas-gold flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-christmas-red" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                    Expert DJs
                  </h3>
                  <p className="text-gray-600">
                    Our talented team of DJs brings personality and warmth to every broadcast.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                    Community Focused
                  </h3>
                  <p className="text-gray-600">
                    We love our listeners! Send requests and connect with fellow holiday music fans.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
