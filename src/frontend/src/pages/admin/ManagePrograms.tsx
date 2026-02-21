import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetProgramSchedule, useAddCustomProgram, useUpdateProgram, useDeleteProgram } from '../../hooks/useQueries';
import type { Program } from '../../backend';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function ManagePrograms() {
  const { data: programs = [], isLoading } = useGetProgramSchedule();
  const addProgram = useAddCustomProgram();
  const updateProgram = useUpdateProgram();
  const deleteProgram = useDeleteProgram();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleOpenDialog = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        name: program.name,
        description: program.description,
        startTime: program.startTime,
        endTime: program.endTime,
      });
    } else {
      setEditingProgram(null);
      setFormData({ name: '', description: '', startTime: '', endTime: '' });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.startTime.trim() || !formData.endTime.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (editingProgram) {
        await updateProgram.mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          startTime: formData.startTime.trim(),
          endTime: formData.endTime.trim(),
        });
        toast.success('Program updated successfully!');
      } else {
        await addProgram.mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          startTime: formData.startTime.trim(),
          endTime: formData.endTime.trim(),
        });
        toast.success('Program added successfully!');
      }

      setDialogOpen(false);
      setFormData({ name: '', description: '', startTime: '', endTime: '' });
    } catch (error: any) {
      console.error('Error saving program:', error);
      toast.error(error.message || 'Failed to save program');
    }
  };

  const handleDelete = async () => {
    if (!programToDelete) return;

    try {
      await deleteProgram.mutateAsync(programToDelete);
      toast.success('Program deleted successfully!');
      setDeleteDialogOpen(false);
      setProgramToDelete(null);
    } catch (error: any) {
      console.error('Error deleting program:', error);
      toast.error(error.message || 'Failed to delete program');
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
              Manage Programs
            </h1>
            <p className="text-gray-600">Create, edit, or remove radio programs</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-christmas-green hover:bg-christmas-green-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Program
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center">
            <p className="text-gray-600 mb-4">No programs yet. Add your first program!</p>
            <Button onClick={() => handleOpenDialog()} className="bg-christmas-green hover:bg-christmas-green-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {programs.map((program) => (
              <Card key={program.name} className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                        {program.name}
                      </h3>
                      <p className="text-christmas-red font-medium mb-2">
                        {program.startTime} - {program.endTime}
                      </p>
                      <p className="text-gray-600">{program.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => handleOpenDialog(program)}
                        variant="outline"
                        size="sm"
                        className="border-christmas-green text-christmas-green hover:bg-christmas-green hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setProgramToDelete(program.name);
                          setDeleteDialogOpen(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
              <DialogTitle className="text-2xl font-christmas text-christmas-green">
                {editingProgram ? 'Edit Program' : 'Add New Program'}
              </DialogTitle>
              <DialogDescription>
                {editingProgram ? 'Update the program information' : 'Add a new program to your schedule'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter program name"
                  disabled={!!editingProgram}
                  className="border-christmas-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter program description"
                  rows={3}
                  className="border-christmas-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    placeholder="e.g., Weekdays 2:00 PM"
                    className="border-christmas-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="e.g., 7:00 PM (CST)"
                    className="border-christmas-gold"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={addProgram.isPending || updateProgram.isPending}
                  className="bg-christmas-green hover:bg-christmas-green-dark"
                >
                  {addProgram.isPending || updateProgram.isPending ? 'Saving...' : editingProgram ? 'Update' : 'Add'}
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
                Delete Program
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this program? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteProgram.isPending}
                className="bg-christmas-red hover:bg-christmas-red-dark"
              >
                {deleteProgram.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
