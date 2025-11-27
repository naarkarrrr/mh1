
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            This is a generic dashboard for unassigned staff roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please contact an administrator to get your role assigned.</p>
        </CardContent>
      </Card>
    </main>
  );
}
