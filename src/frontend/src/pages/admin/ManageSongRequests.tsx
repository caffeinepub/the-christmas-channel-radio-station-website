import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Music, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ProtectedRoute from "../../components/ProtectedRoute";
import {
  useClearSongRequests,
  useGetSongRequests,
} from "../../hooks/useQueries";

export default function ManageSongRequests() {
  const { data: requests = [], isLoading } = useGetSongRequests();
  const clearRequests = useClearSongRequests();

  const handleClearAll = async () => {
    try {
      await clearRequests.mutateAsync();
      toast.success("All requests cleared successfully!");
    } catch (_e) {
      toast.error("Failed to clear requests", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-christmas-dark mb-2 font-christmas">
              🎵 Incoming Song Requests
            </h1>
            <p className="text-gray-600">
              View and manage listener song requests
            </p>
          </div>
          {requests.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={clearRequests.isPending}
                  className="bg-christmas-red hover:bg-christmas-red-dark"
                >
                  {clearRequests.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All Requests
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All Requests?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {requests.length} song
                    request(s). This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAll}
                    className="bg-christmas-red hover:bg-christmas-red-dark"
                  >
                    Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {isLoading ? (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
            <div className="p-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-christmas-gold mx-auto mb-4" />
              <p className="text-gray-600">Loading requests...</p>
            </div>
          </Card>
        ) : requests.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2">
            <div className="p-12 text-center">
              <Music className="h-16 w-16 text-christmas-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-christmas-dark mb-2 font-christmas">
                No Requests Yet
              </h3>
              <p className="text-gray-600">
                Song requests from listeners will appear here.
              </p>
            </div>
          </Card>
        ) : (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-christmas-gold/20 hover:bg-christmas-gold/30">
                    <TableHead className="font-bold text-christmas-dark">
                      Listener Name
                    </TableHead>
                    <TableHead className="font-bold text-christmas-dark">
                      Song Title
                    </TableHead>
                    <TableHead className="font-bold text-christmas-dark">
                      Message
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow
                      key={`${request.name}-${request.songTitle}-${request.message}`}
                      className="hover:bg-christmas-gold/10 transition-colors"
                    >
                      <TableCell className="font-medium text-christmas-dark">
                        {request.name}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {request.songTitle}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-md">
                        {request.message || (
                          <span className="italic text-gray-400">
                            No message
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {requests.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            <p>
              Total requests:{" "}
              <span className="font-bold text-christmas-dark">
                {requests.length}
              </span>
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
