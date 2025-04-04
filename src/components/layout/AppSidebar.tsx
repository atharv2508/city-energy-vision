
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  BarChart2, 
  Map, 
  AlertTriangle, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function AppSidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Map View", href: "/map", icon: Map },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      <aside 
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-30 md:z-0 flex flex-col w-64 bg-background border-r transition-transform duration-300",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
          !isMobile && !isOpen && "-translate-x-48",
          "h-screen"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h1 className={cn(
              "text-xl font-semibold transition-opacity",
              !isOpen && !isMobile && "opacity-0"
            )}>
              CityEnergy
            </h1>
          </div>
          <Button 
            onClick={toggleSidebar} 
            variant="ghost" 
            size="icon" 
            className="md:flex hidden"
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={cn(
                    "transition-opacity", 
                    !isOpen && !isMobile && "opacity-0"
                  )}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
            <LogOut className="h-4 w-4" />
            <span className={cn(
              "transition-opacity", 
              !isOpen && !isMobile && "opacity-0"
            )}>
              Log Out
            </span>
          </Button>
        </div>
      </aside>
    </>
  );
}
