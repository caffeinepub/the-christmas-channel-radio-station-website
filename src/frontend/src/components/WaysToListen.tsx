import { Globe, Radio, Smartphone, Music, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function WaysToListen() {
  const listeningMethods = [
    {
      icon: Globe,
      title: 'Website',
      description: 'Listen directly on our website with the embedded player above',
      link: '#',
      color: 'christmas-red',
      action: 'Scroll Up',
    },
    {
      icon: Radio,
      title: 'Live365 App',
      description: 'Download the Live365 app and find The Christmas Channel',
      link: 'https://live365.com/station/The-Christmas-Channel-a76054',
      color: 'christmas-green',
      action: 'Open Live365',
    },
    {
      icon: Smartphone,
      title: 'Radioline App',
      description: 'Stream us on the Radioline app for iOS and Android',
      link: 'https://radioline.co/',
      color: 'christmas-gold',
      action: 'Open Radioline',
    },
    {
      icon: Music,
      title: 'Online Radio Box',
      description: 'Find us on Online Radio Box for easy streaming',
      link: 'https://onlineradiobox.com/',
      color: 'christmas-red',
      action: 'Open Radio Box',
    },
    {
      icon: Headphones,
      title: 'Get Me Radio',
      description: 'Listen to The Christmas Channel on Get Me Radio',
      link: 'https://www.getmeradio.com/stations/thechristmaschannel-11457/?station_id=11457',
      color: 'christmas-green',
      action: 'Open Get Me Radio',
    },
  ];

  const handleClick = (link: string) => {
    if (link === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl">
      <div className="p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-christmas-dark mb-3 font-christmas">
            🎧 Ways to Listen
          </h2>
          <p className="text-gray-600 text-lg">
            Tune in to The Christmas Channel wherever you are!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {listeningMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.title}
                className={`bg-gradient-to-br from-white to-${method.color}/5 border-${method.color} border-2 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-${method.color}-dark group cursor-pointer`}
                onClick={() => handleClick(method.link)}
              >
                <div className="p-6 text-center h-full flex flex-col">
                  <div
                    className={`h-16 w-16 rounded-full bg-gradient-to-br from-${method.color} to-${method.color}-dark mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:animate-pulse transition-all`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 grow">
                    {method.description}
                  </p>
                  <Button
                    className={`bg-${method.color} hover:bg-${method.color}-dark text-white w-full shadow-md hover:shadow-lg transition-all ${
                      method.color === 'christmas-gold' ? 'text-christmas-red' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(method.link);
                    }}
                  >
                    {method.action}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Decorative snowflakes */}
        <div className="mt-8 text-center text-4xl opacity-30 select-none">
          ❄️ ✨ ❄️ ✨ ❄️
        </div>
      </div>
    </Card>
  );
}
