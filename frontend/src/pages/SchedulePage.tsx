import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGetProgramSchedule } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProgramDaySlot } from '../backend';

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_ACCENT: Record<string, { bg: string; border: string; badge: string; dot: string }> = {
  Monday:    { bg: 'from-blue-50 to-white',    border: 'border-blue-200',    badge: 'bg-blue-600 text-white',    dot: 'bg-blue-500' },
  Tuesday:   { bg: 'from-purple-50 to-white',  border: 'border-purple-200',  badge: 'bg-purple-600 text-white',  dot: 'bg-purple-500' },
  Wednesday: { bg: 'from-green-50 to-white',   border: 'border-green-200',   badge: 'bg-green-600 text-white',   dot: 'bg-green-500' },
  Thursday:  { bg: 'from-orange-50 to-white',  border: 'border-orange-200',  badge: 'bg-orange-500 text-white',  dot: 'bg-orange-500' },
  Friday:    { bg: 'from-pink-50 to-white',    border: 'border-pink-200',    badge: 'bg-pink-600 text-white',    dot: 'bg-pink-500' },
  Saturday:  { bg: 'from-yellow-50 to-white',  border: 'border-yellow-200',  badge: 'bg-yellow-500 text-white',  dot: 'bg-yellow-500' },
  Sunday:    { bg: 'from-red-50 to-white',     border: 'border-red-200',     badge: 'bg-christmas-red text-white', dot: 'bg-christmas-red' },
};

const today = (): string => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
};

export default function SchedulePage() {
  const { data: slots, isLoading } = useGetProgramSchedule();

  // Group slots by day
  const slotsByDay: Record<string, ProgramDaySlot[]> = {};
  if (slots) {
    for (const slot of slots) {
      if (!slotsByDay[slot.day]) slotsByDay[slot.day] = [];
      slotsByDay[slot.day].push(slot);
    }
    // Sort within each day by start time
    for (const day of Object.keys(slotsByDay)) {
      slotsByDay[day].sort((a, b) => a.program.startTime.localeCompare(b.program.startTime));
    }
  }

  const orderedDays = ALL_DAYS.filter((d) => slotsByDay[d]);
  const currentDay = today();

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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tune in to your favorite shows — here's what's on the air this week.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-28 w-full rounded-xl" />
                <Skeleton className="h-28 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : orderedDays.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No programs scheduled yet. Check back soon!</p>
          </Card>
        ) : (
          <>
            {/* Quick-nav day pills */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {orderedDays.map((day) => {
                const accent = DAY_ACCENT[day] || DAY_ACCENT['Monday'];
                const isToday = day === currentDay;
                return (
                  <a
                    key={day}
                    href={`#day-${day}`}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      isToday
                        ? `${accent.badge} shadow-md ring-2 ring-offset-1 ring-current`
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {isToday ? `📍 ${day}` : day}
                  </a>
                );
              })}
            </div>

            <div className="space-y-10">
              {orderedDays.map((day) => {
                const accent = DAY_ACCENT[day] || DAY_ACCENT['Monday'];
                const isToday = day === currentDay;

                return (
                  <section key={day} id={`day-${day}`}>
                    {/* Day header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-5 py-1.5 rounded-full text-sm font-bold ${accent.badge}`}>
                        {day}
                      </span>
                      {isToday && (
                        <span className="text-xs font-semibold text-christmas-red bg-christmas-red/10 px-3 py-1 rounded-full border border-christmas-red/20">
                          Today
                        </span>
                      )}
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400">
                        {slotsByDay[day].length} show{slotsByDay[day].length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Slots */}
                    <div className="space-y-3 pl-1">
                      {slotsByDay[day].map((slot) => (
                        <Card
                          key={`${slot.program.name}-${slot.day}`}
                          className={`bg-gradient-to-r ${accent.bg} ${accent.border} border-2 hover:shadow-lg transition-shadow`}
                        >
                          <div className="p-5">
                            <div className="flex items-start gap-3">
                              <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${accent.dot}`} />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-christmas-dark font-christmas leading-tight">
                                  {slot.program.name}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-0.5 mb-2">
                                  <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                  <span className="text-sm font-medium text-christmas-red">
                                    {slot.program.startTime} – {slot.program.endTime}
                                  </span>
                                </div>
                                {slot.program.description && (
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    {slot.program.description}
                                  </p>
                                )}
                                {slot.program.bio && (
                                  <p className="text-sm text-gray-500 italic mt-2 leading-relaxed border-t border-gray-200/80 pt-2">
                                    {slot.program.bio}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
