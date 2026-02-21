import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useGetStationInformation, useUpdateStationInformation } from '../../hooks/useQueries';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function ManageStationInfo() {
  const { data: stationInfo, isLoading } = useGetStationInformation();
  const updateStationInfo = useUpdateStationInformation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
  });

  useEffect(() => {
    if (stationInfo) {
      setFormData({
        title: stationInfo.title,
        description: stationInfo.description,
        content: stationInfo.content,
      });
    }
  }, [stationInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    try {
      await updateStationInfo.mutateAsync({
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
      });
      toast.success('Station information updated successfully!');
    } catch (error: any) {
      console.error('Error updating station info:', error);
      toast.error(error.message || 'Failed to update station information');
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4 text-christmas-red hover:text-christmas-red-dark">
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-christmas-dark mb-2 font-christmas">
              Manage Station Information
            </h1>
            <p className="text-gray-600">Update the About Station section content</p>
          </div>

          {isLoading ? (
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center">
              <div className="animate-spin h-12 w-12 border-4 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Loading station information...</p>
            </Card>
          ) : (
            <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-lg font-semibold text-christmas-dark">
                      Section Title
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., About Our Station"
                      className="border-christmas-gold text-lg"
                    />
                    <p className="text-sm text-gray-500">
                      This will be displayed as the heading of the About Station section
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg font-semibold text-christmas-dark">
                      Short Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="A brief description or tagline"
                      rows={2}
                      className="border-christmas-gold"
                    />
                    <p className="text-sm text-gray-500">
                      A short summary that appears below the title
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-lg font-semibold text-christmas-dark">
                      Main Content
                    </Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Enter the main content for the About Station section. You can use HTML for formatting."
                      rows={12}
                      className="border-christmas-gold font-mono text-sm"
                    />
                    <p className="text-sm text-gray-500">
                      Main content for the section. Basic HTML tags are supported (p, strong, em, br, ul, ol, li, etc.)
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={updateStationInfo.isPending}
                      className="bg-christmas-green hover:bg-christmas-green-dark flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updateStationInfo.isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>

                {/* Preview Section */}
                {(formData.title || formData.description || formData.content) && (
                  <div className="mt-8 pt-8 border-t border-christmas-gold">
                    <h3 className="text-xl font-bold text-christmas-dark mb-4 font-christmas">
                      Preview
                    </h3>
                    <Card className="bg-gray-50 border-christmas-green border-2">
                      <div className="p-6">
                        {formData.title && (
                          <h4 className="text-2xl font-bold text-christmas-dark mb-2 font-christmas">
                            {formData.title}
                          </h4>
                        )}
                        {formData.description && (
                          <p className="text-gray-600 italic mb-4">{formData.description}</p>
                        )}
                        {formData.content && (
                          <div 
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: formData.content }}
                          />
                        )}
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
