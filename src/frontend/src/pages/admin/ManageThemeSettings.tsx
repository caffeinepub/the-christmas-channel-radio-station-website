import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Eye, Save, Palette } from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useGetThemeSettings, useUpdateThemeSettings } from '../../hooks/useQueries';
import { BackgroundImage, TailwindColor } from '../../backend';

export default function ManageThemeSettings() {
  const navigate = useNavigate();
  const { data: themeSettings, isLoading } = useGetThemeSettings();
  const updateThemeSettings = useUpdateThemeSettings();

  const [showCountdown, setShowCountdown] = useState(true);
  const [snowEnabled, setSnowEnabled] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<BackgroundImage>(BackgroundImage.snowyVillage);
  const [primaryColor, setPrimaryColor] = useState<TailwindColor>(TailwindColor.red);
  const [accentColor, setAccentColor] = useState<TailwindColor>(TailwindColor.gold);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (themeSettings) {
      setShowCountdown(themeSettings.showCountdown);
      setSnowEnabled(themeSettings.snowEnabled);
      setBackgroundImage(themeSettings.backgroundImage);
      setPrimaryColor(themeSettings.primaryColor);
      setAccentColor(themeSettings.accentColor);
    }
  }, [themeSettings]);

  const handleSave = async () => {
    try {
      await updateThemeSettings.mutateAsync({
        showCountdown,
        snowEnabled,
        backgroundImage,
        primaryColor,
        accentColor,
      });
      toast.success('Theme settings saved successfully!');
      setIsPreview(false);
    } catch (error) {
      console.error('Error saving theme settings:', error);
      toast.error('Failed to save theme settings');
    }
  };

  const handlePreview = () => {
    setIsPreview(true);
    toast.info('Preview mode enabled. Changes are not saved yet.');
  };

  const backgroundImageOptions = [
    { value: BackgroundImage.snowyVillage, label: 'Snowy Village', image: '/assets/generated/snowy-village-background.dim_1920x1080.jpg' },
    { value: BackgroundImage.twinklingLights, label: 'Twinkling Lights', image: '/assets/generated/twinkling-lights-background.dim_1920x1080.jpg' },
    { value: BackgroundImage.festiveTree, label: 'Festive Tree', image: '/assets/generated/festive-tree-background.dim_1920x1080.jpg' },
  ];

  const colorOptions = [
    { value: TailwindColor.red, label: 'Red', color: 'oklch(0.52 0.22 25)' },
    { value: TailwindColor.green, label: 'Green', color: 'oklch(0.48 0.18 155)' },
    { value: TailwindColor.gold, label: 'Gold', color: 'oklch(0.78 0.15 85)' },
    { value: TailwindColor.blue, label: 'Blue', color: 'oklch(0.55 0.20 250)' },
    { value: TailwindColor.purple, label: 'Purple', color: 'oklch(0.55 0.20 300)' },
    { value: TailwindColor.brown, label: 'Brown', color: 'oklch(0.45 0.10 50)' },
    { value: TailwindColor.white, label: 'White', color: 'oklch(0.95 0.02 85)' },
  ];

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-gray-600">Loading theme settings...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/admin' })}
              className="mb-4 text-christmas-red hover:text-christmas-red-dark"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-christmas-dark font-christmas">
              🎨 Christmas Theme Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Customize the look and feel of your Christmas Channel
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-christmas-dark mb-6 font-christmas flex items-center gap-2">
                <Palette className="h-6 w-6 text-christmas-gold" />
                Theme Configuration
              </h2>

              <div className="space-y-6">
                {/* Snow Effects Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="snow-toggle" className="text-base font-semibold text-christmas-dark">
                      Snow Effects
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Enable or disable animated snowfall
                    </p>
                  </div>
                  <Switch
                    id="snow-toggle"
                    checked={snowEnabled}
                    onCheckedChange={setSnowEnabled}
                  />
                </div>

                {/* Christmas Countdown Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="countdown-toggle" className="text-base font-semibold text-christmas-dark">
                      Christmas Countdown
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Show countdown timer on homepage
                    </p>
                  </div>
                  <Switch
                    id="countdown-toggle"
                    checked={showCountdown}
                    onCheckedChange={setShowCountdown}
                  />
                </div>

                {/* Background Image Selection */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-base font-semibold text-christmas-dark mb-3 block">
                    Background Image
                  </Label>
                  <Select
                    value={backgroundImage}
                    onValueChange={(value) => setBackgroundImage(value as BackgroundImage)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select background" />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundImageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {backgroundImageOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setBackgroundImage(option.value)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                          backgroundImage === option.value
                            ? 'border-christmas-gold ring-2 ring-christmas-gold'
                            : 'border-gray-300 hover:border-christmas-gold'
                        }`}
                      >
                        <img
                          src={option.image}
                          alt={option.label}
                          className="w-full h-20 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Color Selection */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-base font-semibold text-christmas-dark mb-3 block">
                    Primary Color
                  </Label>
                  <Select
                    value={primaryColor}
                    onValueChange={(value) => setPrimaryColor(value as TailwindColor)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select primary color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: option.color }}
                            />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-3 flex gap-2">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPrimaryColor(option.value)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          primaryColor === option.value
                            ? 'border-christmas-dark ring-2 ring-christmas-gold'
                            : 'border-gray-300 hover:border-christmas-gold'
                        }`}
                        style={{ backgroundColor: option.color }}
                        title={option.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Accent Color Selection */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-base font-semibold text-christmas-dark mb-3 block">
                    Accent Color
                  </Label>
                  <Select
                    value={accentColor}
                    onValueChange={(value) => setAccentColor(value as TailwindColor)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select accent color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: option.color }}
                            />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-3 flex gap-2">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setAccentColor(option.value)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          accentColor === option.value
                            ? 'border-christmas-dark ring-2 ring-christmas-gold'
                            : 'border-gray-300 hover:border-christmas-gold'
                        }`}
                        style={{ backgroundColor: option.color }}
                        title={option.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handlePreview}
                  variant="outline"
                  className="flex-1 border-christmas-gold text-christmas-gold hover:bg-christmas-gold hover:text-white"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={updateThemeSettings.isPending}
                  className="flex-1 bg-christmas-red hover:bg-christmas-red-dark"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {updateThemeSettings.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Preview Panel */}
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-green border-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-christmas-dark mb-6 font-christmas flex items-center gap-2">
                <Eye className="h-6 w-6 text-christmas-green" />
                Live Preview
              </h2>

              <div className="space-y-4">
                {isPreview && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                    <strong>Preview Mode:</strong> Changes shown below are not saved yet. Click "Save Changes" to apply.
                  </div>
                )}

                {/* Preview Background */}
                <div className="rounded-lg overflow-hidden border-2 border-gray-300">
                  <div
                    className="h-48 relative"
                    style={{
                      backgroundImage: `url(${backgroundImageOptions.find(opt => opt.value === backgroundImage)?.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 flex items-center justify-center">
                      <p className="text-white font-bold text-lg">Background Preview</p>
                    </div>
                  </div>
                </div>

                {/* Preview Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border-2" style={{ borderColor: colorOptions.find(opt => opt.value === primaryColor)?.color }}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Primary Color</p>
                    <div
                      className="h-16 rounded-lg"
                      style={{ backgroundColor: colorOptions.find(opt => opt.value === primaryColor)?.color }}
                    />
                  </div>
                  <div className="p-4 rounded-lg border-2" style={{ borderColor: colorOptions.find(opt => opt.value === accentColor)?.color }}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Accent Color</p>
                    <div
                      className="h-16 rounded-lg"
                      style={{ backgroundColor: colorOptions.find(opt => opt.value === accentColor)?.color }}
                    />
                  </div>
                </div>

                {/* Preview Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Snow Effects</span>
                    <span className={`text-sm font-semibold ${snowEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                      {snowEnabled ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Christmas Countdown</span>
                    <span className={`text-sm font-semibold ${showCountdown ? 'text-green-600' : 'text-gray-400'}`}>
                      {showCountdown ? '✓ Visible' : '✗ Hidden'}
                    </span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-christmas-gold/10 border border-christmas-gold rounded-lg p-4">
                  <p className="text-sm text-christmas-dark">
                    <strong>Note:</strong> Theme changes will be applied across all pages of the website once saved. 
                    Visitors will see the new theme immediately.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
