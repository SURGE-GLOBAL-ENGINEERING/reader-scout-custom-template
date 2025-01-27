"use client";

import { useLocalStorage } from "@/lib/storage/storage";
import React, { useEffect, useState } from "react";

export function StorageExampleClient() {
  const [isClient, setIsClient] = useState(false);
  const [settings, setSettings] = useLocalStorage("user-settings", {
    notifications: true,
    fontSize: "medium",
    language: "en",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleNotifications = () => {
    setSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  };

  const updateLanguage = (newLang: string) => {
    setSettings((prev) => ({
      ...prev,
      language: newLang,
    }));
  };

  if (!isClient) {
    return (
      <div className="mt-6 space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border">
      <div className="flex items-center justify-between">
        <span>Notifications</span>
        <button
          onClick={toggleNotifications}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          {settings.notifications ? "Enable" : "Disable"}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span>Language</span>
        <select
          value={settings.language}
          onChange={(e) => updateLanguage(e.target.value)}
          className="px-4 py-2 rounded-md border bg-background"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-md">
        <h3 className="font-semibold mb-2">Stored Settings:</h3>
        <pre className="text-sm">{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
}
