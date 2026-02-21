import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, X, Radio } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useGetOnAirOverride, useSetOnAirOverride, useClearOnAirOverride } from '../../hooks/useQueries';
import { toast } from 'sonner';
import type { OnAirOverride } from '../../backend';
import { Badge } from '@/components/ui/badge';

export default function ManageOnAir() {
  const { data: currentOverride, isLoading } = useGetOnAirOverride();
  const setOnAirOverride = useSetOnAirOverride();
  const clearOnAirOverride = useClearOnAirOverride();

  const [showName, setShowName] = useState('');
  const [description, setDescription] = useState('');
  const [durationHours, setDurationHours] = useState('1');

  useEffect(() => {
    if (currentOverride) {
      setShowName(currentOverride.overrideProgram);
      setDescription(currentOverride.description);
      
      // Calculate duration from start and end times
      const durationNs = Number(currentOverride.endTime) - Number(currentOverride.startTime);
      const durationHours = durationNs / (1000000 * 1000 * 60 * 60);
      setDurationHours(durationHours.toString());
    }
  }, [currentOverride]);

  const handleSave = async () => {
    if (!showName.trim()) {
      toast.error('Validation Error', {
        description: 'Show name is required',
      });
      return;
    }

    if (!description.trim()) {
      toast.error('Validation Error', {
        description: 'Description is required',
      });
      return;
    }

    const hours = parseFloat(durationHours);
    if (isNaN(hours) || hours <= 0) {
      toast.error('Validation Error', {
        description: 'Duration must be a positive number',
      });
      return;
    }

    try {
      const now = Date.now();
      const startTime = BigInt(now * 1000000); // Convert to nanoseconds
      const endTime = BigInt((now + hours * 60 * 60 * 1000) * 1000000); // Add duration in nanoseconds

      const override: OnAirOverride = {
        overrideProgram: showName.trim(),
        description: description.trim(),
        startTime,
        endTime,
      };

      await setOnAirOverride.mutateAsync(override);

      toast.success('On Air Override Saved!', {
        description: `"${showName}" will display for ${hours} hour(s)`,
      });
    } catch (error: any) {
      toast.error('Save Failed', {
        description: error.message || 'Failed to save On Air override',
      });
    }
  };

  const handleClear = async () => {
    try {
      await clearOnAirOverride.mutateAsync();
      setShowName('');
      setDescription('');
      setDurationHours('1');

      toast.success('Override Cleared', {
        description: 'On Air display reverted to automatic schedule',
      });
    } catch (error: any) {
      toast.error('Clear Failed', {
        description: error.message || 'Failed to clear On Air override',
      });
    }
  };

  const isActive = currentOverride && Number(currentOverride.endTime) > Date.now() * 1000000;

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-christmas-dark mb-2 font-christmas">
            🎙️ On Air Display Editor
          </h1>
          <p className="text-gray-600">
            Manually control what shows on the public On Air display
          </p>
        </div>

        {/* Status Card */}
        {isActive && (
          <Card className="bg-gradient-to-r from-christmas-red/20 to-christmas-gold/20 border-christmas-gold border-2 shadow-xl mb-6">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold flex items-center justify-center shadow-lg animate-pulse">
                  <Radio className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold">
                      🔴 OVERRIDE ACTIVE
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>"{currentOverride.overrideProgram}"</strong> is currently displaying on the homepage
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Expires: {new Date(Number(currentOverride.endTime) / 1000000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-christmas-dark mb-6 font-christmas">
                Override Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="showName" className="text-christmas-dark font-semibold">
                    Show Name *
                  </Label>
                  <Input
                    id="showName"
                    value={showName}
                    onChange={(e) => setShowName(e.target.value)}
                    placeholder="e.g., Special Holiday Broadcast"
                    className="mt-2 border-christmas-red/30 focus:border-christmas-red"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-christmas-dark font-semibold">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what's happening on this special broadcast..."
                    rows={4}
                    className="mt-2 border-christmas-red/30 focus:border-christmas-red"
                  />
                </div>

                <div>
                  <Label htmlFor="duration" className="text-christmas-dark font-semibold">
                    Duration (hours) *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    placeholder="1"
                    className="mt-2 border-christmas-red/30 focus:border-christmas-red"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    How long should this override last?
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={setOnAirOverride.isPending}
                    className="flex-1 bg-gradient-to-r from-christmas-gold to-christmas-red hover:from-christmas-gold-light hover:to-christmas-red-dark text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    {setOnAirOverride.isPending ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Override
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleClear}
                    disabled={clearOnAirOverride.isPending || !currentOverride}
                    variant="outline"
                    className="flex-1 border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white"
                  >
                    {clearOnAirOverride.isPending ? (
                      <>Clearing...</>
                    ) : (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Clear Override
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Live Preview */}
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-christmas-dark mb-6 font-christmas">
                Live Preview
              </h2>

              {showName && description ? (
                <Card className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-2xl relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-christmas-red/10 via-christmas-gold/10 to-christmas-red/10 animate-on-air-glow" />
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 border-2 border-christmas-gold rounded-lg animate-on-air-border-pulse" />
                  
                  <div className="p-6 relative">
                    <div className="flex items-start gap-4">
                      {/* Animated radio icon */}
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-christmas-red via-christmas-gold to-christmas-red flex items-center justify-center shadow-2xl animate-on-air-icon-pulse relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold animate-on-air-icon-glow opacity-50 blur-md" />
                        <Radio className="h-8 w-8 text-white relative z-10 drop-shadow-lg" />
                      </div>
                      
                      <div className="flex-1">
                        {/* "On Air" badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold uppercase tracking-wide shadow-lg animate-on-air-badge relative overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-on-air-badge-shimmer" />
                            <span className="relative z-10">🔴 On Air Now</span>
                          </Badge>
                        </div>
                        
                        {/* Program name */}
                        <h3 className="text-2xl font-bold text-christmas-dark font-christmas mb-2 animate-on-air-text-glow">
                          {showName}
                        </h3>
                        
                        {/* Program description */}
                        <p className="text-gray-700 leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Radio className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Fill in the form to see a preview</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">ℹ️ How it works</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Override will display immediately after saving</li>
                  <li>• Automatically reverts to schedule after duration expires</li>
                  <li>• Clear override anytime to return to automatic display</li>
                  <li>• Changes are visible on the homepage instantly</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
