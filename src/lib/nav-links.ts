import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Bed,
  Calendar,
  FlaskConical,
  Pill,
  ShieldAlert,
  Settings,
  Warehouse,
  Bot,
  HeartPulse,
  Package,
  Siren,
  FileText,
  Stethoscope,
  Microscope,
  Waypoints
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const adminNavLinks: NavLink[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/staff', label: 'Staff Management', icon: Users },
  { href: '/admin/inventory', label: 'Inventory', icon: Warehouse },
  { href: '/admin/ai', label: 'AI & Analytics', icon: Bot },
  { href: '/admin/settings', label: 'System Settings', icon: Settings },
];

export const doctorNavLinks: NavLink[] = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/doctor/patients', label: 'My Patients', icon: Users },
  { href: '/doctor/schedule', label: 'My Schedule', icon: Calendar },
];

export const nurseNavLinks: NavLink[] = [
    { href: '/nurse/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/nurse/beds', label: 'Bed Management', icon: Bed },
    { href: '/nurse/vitals', label: 'Record Vitals', icon: HeartPulse },
];

export const pharmacistNavLinks: NavLink[] = [
    { href: '/pharmacist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/pharmacist/inventory', label: 'Pharmacy Inventory', icon: Warehouse },
    { href: '/pharmacist/prescriptions', label: 'Dispense', icon: Pill },
];

export const labTechnicianNavLinks: NavLink[] = [
    { href: '/lab/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/lab/tests', label: 'Manage Tests', icon: Microscope },
    { href: '/lab/results', label: 'Enter Results', icon: FlaskConical },
];

export const defaultNavLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]
