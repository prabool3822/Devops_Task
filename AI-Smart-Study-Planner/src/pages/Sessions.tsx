import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Clock, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Course = Tables<"courses">;
type StudySession = Tables<"study_sessions">;

export default function Sessions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<(StudySession & { courses: { subject_name: string } | null })[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [duration, setDuration] = useState("30");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSessions = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("study_sessions")
      .select("*, courses(subject_name)")
      .eq("user_id", user.id)
      .order("session_date", { ascending: false });
    setSessions(data || []);
  };

  useEffect(() => {
    if (!user) return;
    fetchSessions();
    supabase.from("courses").select("*").eq("user_id", user.id).then(({ data }) => setCourses(data || []));
  }, [user]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("study_sessions").insert({
      user_id: user.id,
      course_id: courseId,
      session_date: date,
      duration_mins: parseInt(duration),
      notes: notes || null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setCourseId("");
    setDuration("30");
    setNotes("");
    setOpen(false);
    fetchSessions();
    toast({ title: "Session logged!" });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("study_sessions").delete().eq("id", id);
    fetchSessions();
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Study Sessions</h1>
          <p className="text-muted-foreground">Log and track your study time</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Log Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Log a Study Session</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <Select value={courseId} onValueChange={setCourseId} required>
                <SelectTrigger><SelectValue placeholder="Select a course" /></SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.subject_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <Input type="number" placeholder="Duration (minutes)" value={duration} onChange={(e) => setDuration(e.target.value)} min="1" required />
              <Textarea placeholder="Brief notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
              <Button type="submit" className="w-full" disabled={loading || !courseId}>{loading ? "Saving..." : "Log Session"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No sessions logged yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sessions.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{s.courses?.subject_name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{s.notes || "No notes"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{s.duration_mins} min</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(s.session_date), "MMM dd, yyyy")}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
