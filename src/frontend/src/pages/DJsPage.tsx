import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetDJProfiles } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function DJsPage() {
  const { data: djs, isLoading } = useGetDJProfiles();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-christmas-green mb-4">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas">
            Meet Our DJs
          </h1>
          <p className="text-xl text-gray-600">
            The voices bringing you holiday cheer all season long
          </p>
        </div>

        {/* DJ Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
                  <div className="p-6">
                    <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </Card>
              ))}
            </>
          ) : djs && djs.length > 0 ? (
            djs.map((dj, index) => (
              <Card
                key={index}
                className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* DJ Photo */}
                  <div className="relative mb-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={dj.photoUrl.getDirectURL()}
                      alt={dj.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-christmas-dark/50 to-transparent" />
                  </div>

                  {/* DJ Info */}
                  <h3 className="text-2xl font-bold text-christmas-dark mb-2 font-christmas">
                    {dj.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{dj.bio}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
                <div className="p-12 text-center">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No DJs Yet</h3>
                  <p className="text-gray-500">Our team is getting ready for the holiday season!</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
