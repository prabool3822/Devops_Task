import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Course = Tables<"courses">;
type Topic = Tables<"topics">;

export default function Courses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<(Course & { topics: Topic[] })[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [topicsInput, setTopicsInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("courses")
      .select("*, topics(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setCourses(data || []);
  };

  useEffect(() => { fetchCourses(); }, [user]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { data: course, error } = await supabase
      .from("courses")
      .insert({ user_id: user.id, subject_name: name, exam_date: examDate || null, priority })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // Add topics
    if (topicsInput.trim() && course) {
      const topicNames = topicsInput.split(",").map((t) => t.trim()).filter(Boolean);
      if (topicNames.length) {
        await supabase.from("topics").insert(topicNames.map((t) => ({ course_id: course.id, name: t })));
      }
    }

    setName("");
    setExamDate("");
    setPriority("medium");
    setTopicsInput("");
    setOpen(false);
    setLoading(false);
    fetchCourses();
    toast({ title: "Course added!" });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("courses").delete().eq("id", id);
    fetchCourses();
  };

  const priorityColors: Record<string, string> = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-warning/10 text-warning",
    low: "bg-success/10 text-success",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Manage your subjects and topics</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Add a Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <Input placeholder="Subject name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input type="date" placeholder="Exam date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
              <Select value={priority} onValueChange={(v) => setPriority(v as "low" | "medium" | "high")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Topics (comma-separated, optional)" value={topicsInput} onChange={(e) => setTopicsInput(e.target.value)} />
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Adding..." : "Add Course"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No courses yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="font-heading text-lg">{course.subject_name}</CardTitle>
                  {course.exam_date && (
                    <p className="text-xs text-muted-foreground">Exam: {format(new Date(course.exam_date), "MMM dd, yyyy")}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={priorityColors[course.priority]}>{course.priority}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {course.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {course.topics.map((t) => (
                      <Badge key={t.id} variant="outline" className="text-xs">{t.name}</Badge>
                    ))}
                  </div>
                )}
                {course.topics.length === 0 && <p className="text-sm text-muted-foreground">No topics added</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
