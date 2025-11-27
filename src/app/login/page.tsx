'use client';
import { useAuth, Role } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Hospital, User, Stethoscope, Microscope, Pill, ShieldQuestion } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
    }
  }

  const roleIcons: Record<Role, React.ElementType> = {
    admin: ShieldQuestion,
    doctor: Stethoscope,
    nurse: User,
    pharmacist: Pill,
    lab_technician: Microscope,
    staff: User
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto grid w-[380px] gap-6 p-8 rounded-lg shadow-lg bg-background">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-3">
                <Hospital className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">HMS-Core</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Hospital Management System
            </p>
          </div>
          <div className="grid gap-4">
            <Select onValueChange={(value) => setSelectedRole(value as Role)} value={selectedRole}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select your role to sign in" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(roleIcons).map(role => {
                   const Icon = roleIcons[role as Role];
                   return (
                    <SelectItem key={role} value={role} className="h-12 text-base">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="capitalize">{role.replace('_', ' ')}</span>
                      </div>
                    </SelectItem>
                   )
                })}
              </SelectContent>
            </Select>

            <Button
              onClick={handleLogin}
              disabled={!selectedRole}
              className="w-full h-12 text-lg"
            >
              Login
            </Button>
            
          </div>
        </div>
    </div>
  );
}
