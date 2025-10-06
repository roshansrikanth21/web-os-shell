import { useState } from "react";
import { Search, ArrowLeft, ArrowRight, RotateCw, Home } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const BrowserApp = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [inputUrl, setInputUrl] = useState("https://www.google.com");

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
      finalUrl = "https://" + inputUrl;
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
  };

  const quickLinks = [
    { name: "GitHub", url: "https://github.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Browser Controls */}
      <div className="p-3 border-b bg-white/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2 mb-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RotateCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Home className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleNavigate} className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search or enter URL"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </form>

        <div className="flex gap-2 mt-3">
          {quickLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              onClick={() => {
                setUrl(link.url);
                setInputUrl(link.url);
              }}
            >
              {link.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white dark:bg-gray-900">
        <iframe
          src={url}
          className="w-full h-full border-0"
          title="Browser Window"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};
