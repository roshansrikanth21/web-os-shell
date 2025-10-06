import { User, FolderOpen, FileText, Mail, Globe, Power } from "lucide-react";
import { Button } from "./ui/button";

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

export const StartMenu = ({ onClose, onOpenApp }: StartMenuProps) => {
  const menuItems = [
    { id: "profile", icon: <User className="w-5 h-5" />, label: "My Profile" },
    { id: "projects", icon: <FolderOpen className="w-5 h-5" />, label: "Projects" },
    { id: "resume", icon: <FileText className="w-5 h-5" />, label: "Resume" },
    { id: "contact", icon: <Mail className="w-5 h-5" />, label: "Contact" },
    { id: "browser", icon: <Globe className="w-5 h-5" />, label: "Browser" },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-[9998]"
        onClick={onClose}
      />
      <div className="absolute bottom-12 left-0 w-96 glass-window rounded-tr-lg shadow-2xl z-[9999] animate-window-open">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-1">Portfolio OS</h2>
            <p className="text-sm text-muted-foreground">Your digital workspace</p>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-3 h-12 hover:bg-primary/10"
                onClick={() => onOpenApp(item.id)}
              >
                <div className="text-primary">{item.icon}</div>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 hover:bg-destructive/10 text-destructive"
              onClick={() => {
                const confirmed = confirm("Are you sure you want to shut down?");
                if (confirmed) {
                  document.body.style.opacity = "0";
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
              }}
            >
              <Power className="w-5 h-5" />
              <span>Shutdown</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
