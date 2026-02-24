import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useGetDJProfiles, useAddDJProfile, useUpdateDJProfile, useDeleteDJProfile } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';
import type { DJProfile } from '../../backend';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function ManageDJs() {
  const { data: djProfiles = [], isLoading } = useGetDJProfiles();
  const addDJ = useAddDJProfile();
  const updateDJ = useUpdateDJProfile();
  const deleteDJ = useDeleteDJProfile();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDJ, setEditingDJ] = useState<DJProfile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [djToDelete, setDjToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    photoFile: null as File | null,
    photoUrl: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleOpenDialog = (dj?: DJProfile) => {
    if (dj) {
      setEditingDJ(dj);
      setFormData({
        name: dj.name,
        bio: dj.bio,
        photoFile: null,
        photoUrl: dj.photoUrl.getDirectURL(),
      });
    } else {
      setEditingDJ(null);
      setFormData({ name: '', bio: '', photoFile: null, photoUrl: '' });
    }
    setUploadProgress(0);
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setFormData({ ...formData, photoFile: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.bio.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      let photoBlob: ExternalBlob;

      if (formData.photoFile) {
        const arrayBuffer = await formData.photoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        photoBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } else if (editingDJ) {
        photoBlob = editingDJ.photoUrl;
      } else {
        toast.error('Please select a photo');
        return;
      }

      if (editingDJ) {
        await updateDJ.mutateAsync({
          name: formData.name.trim(),
          bio: formData.bio.trim(),
          photo: photoBlob,
        });
        toast.success('DJ profile updated successfully!');
      } else {
        await addDJ.mutateAsync({
          name: formData.name.trim(),
          bio: formData.bio.trim(),
          photo: photoBlob,
        });
        toast.success('DJ profile added successfully!');
      }

      setDialogOpen(false);
      setFormData({ name: '', bio: '', photoFile: null, photoUrl: '' });
      setUploadProgress(0);
    } catch (error: any) {
      console.error('Error saving DJ:', error);
      toast.error(error.message || 'Failed to save DJ profile');
    }
  };

  const handleDelete = async () => {
    if (!djToDelete) return;

    try {
      await deleteDJ.mutateAsync(djToDelete);
      toast.success('DJ profile deleted successfully!');
      setDeleteDialogOpen(false);
      setDjToDelete(null);
    } catch (error: any) {
      console.error('Error deleting DJ:', error);
      toast.error(error.message || 'Failed to delete DJ profile');
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button asChild variant="ghost" className="mb-4 text-christmas-red hover:text-christmas-red-dark">
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-christmas-dark mb-2 font-christmas">
              Manage DJs
            </h1>
            <p className="text-gray-600">Add, edit, or remove DJ profiles</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-christmas-red hover:bg-christmas-red-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add DJ
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-christmas-red border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading DJ profiles...</p>
          </div>
        ) : djProfiles.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center">
            <p className="text-gray-600 mb-4">No DJ profiles yet. Add your first DJ!</p>
            <Button onClick={() => handleOpenDialog()} className="bg-christmas-red hover:bg-christmas-red-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add DJ
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {djProfiles.map((dj) => (
              <Card key={dj.name} className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <img
                    src={dj.photoUrl.getDirectURL()}
                    alt={dj.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                    {dj.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{dj.bio}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleOpenDialog(dj)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-christmas-green text-christmas-green hover:bg-christmas-green hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setDjToDelete(dj.name);
                        setDeleteDialogOpen(true);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg bg-white border-christmas-gold border-2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-christmas text-christmas-red">
                {editingDJ ? 'Edit DJ Profile' : 'Add New DJ'}
              </DialogTitle>
              <DialogDescription>
                {editingDJ ? 'Update the DJ profile information' : 'Add a new DJ to your station'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">DJ Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter DJ name"
                  disabled={!!editingDJ}
                  className="border-christmas-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Enter DJ bio"
                  rows={4}
                  className="border-christmas-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Photo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border-christmas-gold"
                  />
                  {formData.photoUrl && !formData.photoFile && (
                    <img src={formData.photoUrl} alt="Current" className="h-12 w-12 rounded object-cover" />
                  )}
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-christmas-red h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={addDJ.isPending || updateDJ.isPending}
                  className="bg-christmas-red hover:bg-christmas-red-dark"
                >
                  {addDJ.isPending || updateDJ.isPending ? 'Saving...' : editingDJ ? 'Update' : 'Add'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white border-christmas-red border-2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-christmas text-christmas-red">
                Delete DJ Profile
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this DJ profile? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteDJ.isPending}
                className="bg-christmas-red hover:bg-christmas-red-dark"
              >
                {deleteDJ.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
