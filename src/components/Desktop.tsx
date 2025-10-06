import { useState } from "react";
import { Taskbar } from "./Taskbar";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User, FolderOpen, FileText, Mail, Globe, FileWarning } from "lucide-react";
import { ProfileApp } from "./apps/ProfileApp";
import { ProjectsApp } from "./apps/ProjectsApp";
import { ResumeApp } from "./apps/ResumeApp";
import { ContactApp } from "./apps/ContactApp";
import { BrowserApp } from "./apps/BrowserApp";
import { CybersecurityApp } from "./apps/CybersecurityApp";

export interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const desktopIcons = [
    { id: "profile", title: "My Profile", icon: <User className="w-8 h-8" />, content: <ProfileApp /> },
    { id: "projects", title: "Projects", icon: <FolderOpen className="w-8 h-8" />, content: <ProjectsApp /> },
    { id: "resume", title: "Resume", icon: <FileText className="w-8 h-8" />, content: <ResumeApp /> },
    { id: "contact", title: "Contact", icon: <Mail className="w-8 h-8" />, content: <ContactApp /> },
    { id: "browser", title: "Browser", icon: <Globe className="w-8 h-8" />, content: <BrowserApp /> },
    { id: "cybersecurity", title: "DO_NOT_OPEN", icon: <FileWarning className="w-8 h-8 text-red-500" />, content: <CybersecurityApp /> },
  ];

  const openWindow = (iconId: string) => {
    const icon = desktopIcons.find((i) => i.id === iconId);
    if (!icon) return;

    const existingWindow = windows.find((w) => w.id === iconId);
    if (existingWindow) {
      focusWindow(iconId);
      if (existingWindow.isMinimized) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === iconId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
          )
        );
        setNextZIndex((z) => z + 1);
      }
      return;
    }

    const newWindow: WindowState = {
      id: iconId,
      title: icon.title,
      icon: icon.icon,
      content: icon.content,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      size: { width: 800, height: 600 },
      zIndex: nextZIndex,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextZIndex((z) => z + 1);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const focusWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
    setNextZIndex((z) => z + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  };

  return (
    <div className="h-screen w-screen desktop-gradient overflow-hidden relative select-none">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-6 p-4">
        {desktopIcons.map((icon, index) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.title}
            onDoubleClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onUpdatePosition={updateWindowPosition}
        />
      ))}

      {/* Taskbar */}
      <Taskbar windows={windows} onWindowClick={openWindow} />
    </div>
  );
};
