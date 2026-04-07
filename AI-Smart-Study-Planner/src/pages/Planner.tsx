import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, CalendarDays, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Course = Tables<"courses">;
type PlanTask = { date: string; subject: string; topic: string; duration_mins: number };

export default function Planner() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState("");
  const [examDate, setExamDate] = useState("");
  const [topics, setTopics] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("3");
  const [plan, setPlan] = useState<PlanTask[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("courses").select("*, topics(*)").eq("user_id", user.id).then(({ data }) => {
      setCourses(data || []);
    });
  }, [user]);

  // Auto-fill when course selected
  const handleCourseSelect = (id: string) => {
    setCourseId(id);
    const course = courses.find((c) => c.id === id) as (Course & { topics?: { name: string }[] }) | undefined;
    if (course) {
      if (course.exam_date) setExamDate(course.exam_date);
      if (course.topics?.length) setTopics(course.topics.map((t) => t.name).join(", "));
    }
  };

  const handleGenerate = async () => {
    if (!examDate || !topics || !hoursPerDay) {
      toast({ title: "Missing fields", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    const selectedCourse = courses.find((c) => c.id === courseId);
    setGenerating(true);
    setPlan([]);

    try {
      const { data, error } = await supabase.functions.invoke("ai-study-planner", {
        body: {
          examDate,
          topics,
          hoursPerDay: parseFloat(hoursPerDay),
          subjectName: selectedCourse?.subject_name || "General",
        },
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "AI Error", description: data.error, variant: "destructive" });
      } else if (data?.plan) {
        setPlan(data.plan);
        // Save to DB
        if (user) {
          await supabase.from("ai_study_plans").insert({
            user_id: user.id,
            course_id: courseId || null,
            plan_data: data.plan,
            exam_date: examDate,
          });
        }
        toast({ title: "Plan generated!", description: `${data.plan.length} study tasks created.` });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate plan", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  // Group plan by date
  const grouped = plan.reduce<Record<string, PlanTask[]>>((acc, task) => {
    (acc[task.date] = acc[task.date] || []).push(task);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
          <Brain className="h-8 w-8" /> AI Study Planner
        </h1>
        <p className="text-muted-foreground">Let AI create an optimized study schedule for your exam</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Sparkles className="h-5 w-5 text-secondary" /> Generate Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={courseId} onValueChange={handleCourseSelect}>
            <SelectTrigger><SelectValue placeholder="Select a course (optional, auto-fills)" /></SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.subject_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Exam Date</label>
              <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Study hours/day</label>
              <Input type="number" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} min="1" max="16" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Topics / Chapters</label>
            <Textarea
              placeholder="e.g. Quadratic Equations, Trigonometry, Calculus, Linear Algebra"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={3}
            />
          </div>
          <Button onClick={handleGenerate} disabled={generating} className="w-full sm:w-auto">
            {generating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate AI Plan</>}
          </Button>
        </CardContent>
      </Card>

      {/* Calendar-style plan */}
      {plan.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold flex items-center gap-2">
            <CalendarDays className="h-5 w-5" /> Your Study Plan ({plan.length} tasks)
          </h2>
          <div className="space-y-3">
            {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, tasks]) => (
              <Card key={date}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {format(new Date(date + "T00:00:00"), "EEEE, MMM dd, yyyy")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="font-medium">{task.topic}</p>
                        <p className="text-xs text-muted-foreground">{task.subject}</p>
                      </div>
                      <Badge variant="outline">{task.duration_mins} min</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
