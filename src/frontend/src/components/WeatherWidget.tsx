import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, CloudFog, CloudLightning, Wind, Loader2 } from 'lucide-react';

interface WeatherDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  summary: string;
}

interface OpenMeteoResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

function getWeatherIcon(code: number) {
  if (code === 0 || code === 1) return <Sun className="h-8 w-8 text-yellow-500" />;
  if (code === 2 || code === 3) return <Cloud className="h-8 w-8 text-gray-400" />;
  if (code >= 45 && code <= 48) return <CloudFog className="h-8 w-8 text-gray-500" />;
  if (code >= 51 && code <= 57) return <CloudDrizzle className="h-8 w-8 text-blue-400" />;
  if (code >= 61 && code <= 67) return <CloudRain className="h-8 w-8 text-blue-600" />;
  if (code >= 71 && code <= 77) return <CloudSnow className="h-8 w-8 text-blue-300" />;
  if (code >= 80 && code <= 86) return <CloudRain className="h-8 w-8 text-blue-700" />;
  if (code >= 95 && code <= 99) return <CloudLightning className="h-8 w-8 text-purple-600" />;
  return <Wind className="h-8 w-8 text-gray-400" />;
}

function getWeatherDescription(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Severe thunderstorm',
  };
  return conditions[code] || 'Unknown';
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useFahrenheit, setUseFahrenheit] = useState(true);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const DULUTH_LAT = 46.7867;
  const DULUTH_LON = -92.1005;

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${DULUTH_LAT}&longitude=${DULUTH_LON}&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=${useFahrenheit ? 'fahrenheit' : 'celsius'}&timezone=America/Chicago&forecast_days=7`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data: OpenMeteoResponse = await response.json();

      const days: WeatherDay[] = data.daily.time.map((date, index) => ({
        date,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weather_code[index],
        summary: getWeatherDescription(data.daily.weather_code[index]),
      }));

      setWeatherData(days);
      setLastFetch(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();

    // Refresh once daily (24 hours)
    const interval = setInterval(() => {
      fetchWeatherData();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [useFahrenheit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-christmas-gold" />
          <span className="ml-3 text-gray-600">Loading weather data...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 p-6">
        <div className="text-center py-8">
          <CloudRain className="h-12 w-12 text-christmas-red mx-auto mb-3" />
          <p className="text-christmas-red font-semibold mb-2">Weather data unavailable</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <Button onClick={fetchWeatherData} className="bg-christmas-red hover:bg-christmas-red-dark">
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 overflow-hidden">
      <div className="bg-gradient-to-r from-christmas-red/10 to-christmas-gold/10 p-6 border-b-2 border-christmas-gold">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-christmas-dark font-christmas flex items-center gap-2">
            ❄️ Duluth, MN Weather
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={useFahrenheit ? 'default' : 'outline'}
              onClick={() => setUseFahrenheit(true)}
              className={useFahrenheit ? 'bg-christmas-red hover:bg-christmas-red-dark' : 'border-christmas-red text-christmas-red hover:bg-christmas-red/10'}
            >
              °F
            </Button>
            <Button
              size="sm"
              variant={!useFahrenheit ? 'default' : 'outline'}
              onClick={() => setUseFahrenheit(false)}
              className={!useFahrenheit ? 'bg-christmas-red hover:bg-christmas-red-dark' : 'border-christmas-red text-christmas-red hover:bg-christmas-red/10'}
            >
              °C
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          7-Day Forecast {lastFetch && `• Updated ${lastFetch.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weatherData.map((day, index) => (
            <div
              key={day.date}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg ${
                index === 0
                  ? 'bg-gradient-to-br from-christmas-gold/20 to-christmas-red/10 border-christmas-gold'
                  : 'bg-white border-gray-200 hover:border-christmas-gold'
              }`}
            >
              <div className="text-center">
                <p className={`font-bold mb-2 ${index === 0 ? 'text-christmas-red text-lg' : 'text-gray-700'}`}>
                  {formatDate(day.date)}
                </p>
                <div className="flex justify-center mb-3">
                  {getWeatherIcon(day.weatherCode)}
                </div>
                <p className="text-sm text-gray-600 mb-3 min-h-[2.5rem] flex items-center justify-center">
                  {day.summary}
                </p>
                <div className="flex justify-center items-center gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">High</p>
                    <p className="text-xl font-bold text-christmas-red">
                      {Math.round(day.maxTemp)}°
                    </p>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Low</p>
                    <p className="text-xl font-bold text-blue-600">
                      {Math.round(day.minTemp)}°
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
