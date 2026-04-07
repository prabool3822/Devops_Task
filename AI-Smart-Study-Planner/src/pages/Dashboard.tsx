import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, Brain, CalendarDays } from "lucide-react";
import { differenceInDays, format } from "date-fns";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type Course = Tables<"courses">;
type StudySession = Tables<"study_sessions">;

const priorityColors: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<(StudySession & { courses: { subject_name: string } | null })[]>([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (!user) return;
    supabase.from("courses").select("*").eq("user_id", user.id).order("exam_date", { ascending: true }).then(({ data }) => setCourses(data || []));
    supabase.from("study_sessions").select("*, courses(subject_name)").eq("user_id", user.id).order("session_date", { ascending: false }).limit(5).then(({ data }) => {
      setSessions(data || []);
    });
    supabase.from("study_sessions").select("duration_mins").eq("user_id", user.id).then(({ data }) => {
      setTotalHours(Math.round((data || []).reduce((sum, s) => sum + s.duration_mins, 0) / 60));
    });
  }, [user]);

  const upcomingExams = courses.filter((c) => c.exam_date && new Date(c.exam_date) >= new Date());

  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your study overview at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-sm text-muted-foreground">Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/20">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalHours}h</p>
              <p className="text-sm text-muted-foreground">Total studied</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20">
              <Brain className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{upcomingExams.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming exams</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg">
              <CalendarDays className="h-5 w-5" /> Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingExams.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming exams. <Link to="/courses" className="text-primary underline">Add a course</Link></p>
            ) : (
              upcomingExams.map((course) => {
                const days = differenceInDays(new Date(course.exam_date!), new Date());
                return (
                  <div key={course.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium">{course.subject_name}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(course.exam_date!), "MMM dd, yyyy")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={priorityColors[course.priority]}>{course.priority}</Badge>
                      <Badge variant="outline">{days === 0 ? "Today!" : `${days}d left`}</Badge>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg">
              <Clock className="h-5 w-5" /> Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sessions yet. <Link to="/sessions" className="text-primary underline">Log a session</Link></p>
            ) : (
              sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="font-medium">{s.courses?.subject_name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{s.notes || "No notes"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{s.duration_mins} min</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(s.session_date), "MMM dd")}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
