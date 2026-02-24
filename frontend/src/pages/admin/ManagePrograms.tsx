import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useGetProgramSchedule, useAddCustomProgram, useUpdateProgram, useDeleteProgram } from '../../hooks/useQueries';
import type { ProgramDaySlot } from '../../backend';
import ProtectedRoute from '../../components/ProtectedRoute';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_COLORS: Record<string, string> = {
  Monday: 'bg-blue-100 text-blue-800 border-blue-200',
  Tuesday: 'bg-purple-100 text-purple-800 border-purple-200',
  Wednesday: 'bg-green-100 text-green-800 border-green-200',
  Thursday: 'bg-orange-100 text-orange-800 border-orange-200',
  Friday: 'bg-pink-100 text-pink-800 border-pink-200',
  Saturday: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Sunday: 'bg-red-100 text-red-800 border-red-200',
};

export default function ManagePrograms() {
  const { data: slots = [], isLoading } = useGetProgramSchedule();
  const addProgram = useAddCustomProgram();
  const updateProgram = useUpdateProgram();
  const deleteProgram = useDeleteProgram();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<ProgramDaySlot | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<{ name: string; day: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    day: 'Monday',
  });

  const handleOpenDialog = (slot?: ProgramDaySlot) => {
    if (slot) {
      setEditingSlot(slot);
      setFormData({
        name: slot.program.name,
        description: slot.program.description,
        startTime: slot.program.startTime,
        endTime: slot.program.endTime,
        day: slot.day,
      });
    } else {
      setEditingSlot(null);
      setFormData({ name: '', description: '', startTime: '', endTime: '', day: 'Monday' });
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
      if (editingSlot) {
        await updateProgram.mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          startTime: formData.startTime.trim(),
          endTime: formData.endTime.trim(),
          oldDay: editingSlot.day,
          newDay: formData.day,
        });
        toast.success('Program slot updated successfully!');
      } else {
        await addProgram.mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          startTime: formData.startTime.trim(),
          endTime: formData.endTime.trim(),
          days: [formData.day],
        });
        toast.success('Program slot added successfully!');
      }

      setDialogOpen(false);
      setFormData({ name: '', description: '', startTime: '', endTime: '', day: 'Monday' });
    } catch (error: any) {
      console.error('Error saving program:', error);
      toast.error(error.message || 'Failed to save program');
    }
  };

  const handleDelete = async () => {
    if (!slotToDelete) return;

    try {
      await deleteProgram.mutateAsync({ name: slotToDelete.name, day: slotToDelete.day });
      toast.success('Program slot deleted successfully!');
      setDeleteDialogOpen(false);
      setSlotToDelete(null);
    } catch (error: any) {
      console.error('Error deleting program:', error);
      toast.error(error.message || 'Failed to delete program');
    }
  };

  // Group slots by day for display
  const slotsByDay: Record<string, ProgramDaySlot[]> = {};
  for (const slot of slots) {
    if (!slotsByDay[slot.day]) slotsByDay[slot.day] = [];
    slotsByDay[slot.day].push(slot);
  }

  // Sort slots within each day by start time
  for (const day of Object.keys(slotsByDay)) {
    slotsByDay[day].sort((a, b) => a.program.startTime.localeCompare(b.program.startTime));
  }

  const orderedDays = ALL_DAYS.filter((d) => slotsByDay[d]);

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
            <p className="text-gray-600">Create, edit, or remove radio program slots by weekday</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-christmas-green hover:bg-christmas-green-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Program Slot
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading programs...</p>
          </div>
        ) : slots.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No program slots yet. Add your first weekday program slot!</p>
            <Button onClick={() => handleOpenDialog()} className="bg-christmas-green hover:bg-christmas-green-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Program Slot
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            {orderedDays.map((day) => (
              <div key={day}>
                {/* Day header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${DAY_COLORS[day] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                    {day}
                  </div>
                  <div className="flex-1 h-px bg-christmas-gold/30" />
                  <span className="text-xs text-gray-400">{slotsByDay[day].length} slot{slotsByDay[day].length !== 1 ? 's' : ''}</span>
                </div>

                <div className="space-y-3 pl-2">
                  {slotsByDay[day].map((slot) => (
                    <Card
                      key={`${slot.program.name}-${slot.day}`}
                      className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-shadow"
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-christmas-dark font-christmas">
                                {slot.program.name}
                              </h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DAY_COLORS[slot.day] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                {slot.day}
                              </span>
                            </div>
                            <p className="text-christmas-red font-medium text-sm mb-1">
                              {slot.program.startTime} – {slot.program.endTime}
                            </p>
                            <p className="text-gray-600 text-sm line-clamp-2">{slot.program.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4 shrink-0">
                            <Button
                              onClick={() => handleOpenDialog(slot)}
                              variant="outline"
                              size="sm"
                              className="border-christmas-green text-christmas-green hover:bg-christmas-green hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => {
                                setSlotToDelete({ name: slot.program.name, day: slot.day });
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
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg bg-white border-christmas-gold border-2">
            <DialogHeader>
              <DialogTitle className="text-2xl font-christmas text-christmas-green">
                {editingSlot ? 'Edit Program Slot' : 'Add New Program Slot'}
              </DialogTitle>
              <DialogDescription>
                {editingSlot
                  ? 'Update the program slot information'
                  : 'Add a new program slot to a specific weekday'}
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
                  disabled={!!editingSlot}
                  className="border-christmas-gold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="day">Day of Week</Label>
                <Select
                  value={formData.day}
                  onValueChange={(val) => setFormData({ ...formData, day: val })}
                >
                  <SelectTrigger id="day" className="border-christmas-gold">
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {WEEKDAYS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="e.g., 2:00 PM"
                    className="border-christmas-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="e.g., 7:00 PM"
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
                  {addProgram.isPending || updateProgram.isPending
                    ? 'Saving...'
                    : editingSlot
                    ? 'Update'
                    : 'Add'}
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
                Delete Program Slot
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the{' '}
                <strong>{slotToDelete?.day}</strong> slot for{' '}
                <strong>{slotToDelete?.name}</strong>? This action cannot be undone.
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
