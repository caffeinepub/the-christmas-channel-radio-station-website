import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetProgramSchedule } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function SchedulePage() {
  const { data: schedule, isLoading } = useGetProgramSchedule();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-christmas-red mb-4">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas">
            Program Schedule
          </h1>
          <p className="text-xl text-gray-600">
            Your daily dose of festive programming
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
                  <div className="p-6">
                    <div className="flex gap-6">
                      <Skeleton className="h-16 w-24" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : schedule && schedule.length > 0 ? (
            schedule.map((program, index) => (
              <Card
                key={index}
                className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Time */}
                    <div className="flex items-center gap-2 md:w-48">
                      <Clock className="h-5 w-5 text-christmas-red" />
                      <div className="font-bold text-christmas-dark">
                        <div className="text-lg">{program.startTime}</div>
                        <div className="text-sm text-gray-500">to {program.endTime}</div>
                      </div>
                    </div>

                    {/* Program Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-christmas-dark mb-2 font-christmas">
                        {program.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{program.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
              <div className="p-12 text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No Programs Scheduled</h3>
                <p className="text-gray-500">Check back soon for our festive programming lineup!</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
