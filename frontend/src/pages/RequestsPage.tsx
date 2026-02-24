import { useState } from 'react';
import { Radio, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useSubmitSongRequest } from '../hooks/useQueries';

export default function RequestsPage() {
  const [name, setName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [message, setMessage] = useState('');

  const submitRequest = useSubmitSongRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitRequest.mutateAsync({
        name,
        songTitle,
        message,
      });

      toast.success('Request submitted!', {
        description: `Thanks ${name}! We'll try to play "${songTitle}" for you soon.`,
      });

      // Reset form
      setName('');
      setSongTitle('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to submit request', {
        description: 'Please try again later.',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-christmas-gold mb-4">
            <Radio className="h-10 w-10 text-christmas-red" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas">
            Song Requests
          </h1>
          <p className="text-xl text-gray-600">
            Share your favorite holiday tune with us!
          </p>
        </div>

        {/* Request Form */}
        <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-christmas-dark font-medium">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="mt-2 border-christmas-gold/30 focus:border-christmas-gold"
                />
              </div>

              {/* Song Request */}
              <div>
                <Label htmlFor="song" className="text-christmas-dark font-medium">
                  Song Request *
                </Label>
                <Input
                  id="song"
                  type="text"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  placeholder="e.g., White Christmas by Bing Crosby"
                  required
                  className="mt-2 border-christmas-gold/30 focus:border-christmas-gold"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-christmas-dark font-medium">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a special message or dedication..."
                  rows={4}
                  className="mt-2 border-christmas-gold/30 focus:border-christmas-gold"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitRequest.isPending}
                className="w-full bg-christmas-red hover:bg-christmas-red-dark text-white font-bold py-6 text-lg"
              >
                {submitRequest.isPending ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 bg-christmas-gold/10 backdrop-blur-sm border-christmas-gold border-2">
          <div className="p-6">
            <h3 className="text-lg font-bold text-christmas-dark mb-2 font-christmas">
              📻 Request Guidelines
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• We play Christmas and holiday music only</li>
              <li>• Requests are played in the order received</li>
              <li>• Please allow time for your song to be queued</li>
              <li>• Keep messages family-friendly</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
