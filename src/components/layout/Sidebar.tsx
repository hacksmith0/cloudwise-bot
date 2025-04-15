
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Cloud, 
  AlertTriangle, 
  LineChart, 
  MessageSquare, 
  Settings, 
  PieChart, 
  Code2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Cloud, label: 'Resources', path: '/resources' },
    { icon: AlertTriangle, label: 'Alerts', path: '/alerts' },
    { icon: LineChart, label: 'Analytics', path: '/analytics' },
    { icon: PieChart, label: 'Cost', path: '/cost' },
    { icon: Code2, label: 'Infrastructure', path: '/infrastructure' },
    { icon: MessageSquare, label: 'ChatBot', path: '/chatbot' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <div 
      className={cn(
        "bg-sidebar flex flex-col h-screen text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <div className="bg-gradient-to-br from-cloud-blue to-cloud-azure rounded-md p-1">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          {!collapsed && <span className="font-bold text-lg whitespace-nowrap">CloudWise</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex flex-col gap-2 p-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
              collapsed && "justify-center px-0",
              isActive 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium">AI</span>
            </div>
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          {!collapsed && (
            <div className="text-xs">
              <p className="font-medium">CloudWise AI</p>
              <p className="text-sidebar-foreground/70">Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
