import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  HeartPulse,
  Upload,
  Bell,
  MessageSquare,
  ShieldAlert,
  Stethoscope,
  Users,
  BarChart2,
  List,
  Package,
  Map,
  Siren,
  FileText,
} from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const patientNavLinks: NavLink[] = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient/ehr', label: 'My EHR', icon: FileText },
  { href: '/patient/upload-prescription', label: 'Upload Prescription', icon: Upload },
  { href: '/patient/alerts', label: 'My Alerts', icon: Bell },
  { href: '/patient/medbot', label: 'MedBot Assistant', icon: MessageSquare },
  { href: '/patient/sos', label: 'Emergency SOS', icon: ShieldAlert },
];

export const doctorNavLinks: NavLink[] = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/doctor/patient/patient-001', label: 'Patient View', icon: Users },
];

export const adminNavLinks: NavLink[] = [
  { href: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
  { href: '/admin/surge-dashboard', label: 'Surge Prediction', icon: BarChart2 },
  { href: '/admin/resource-planner', label: 'Resource Planner', icon: List },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/hotspot-map', label: 'Hotspot Map', icon: Map },
  { href: '/admin/sos-dashboard', label: 'SOS Dashboard', icon: Siren },
];

    