// Split into server and client components
import { StorageExampleClient } from "./storage-example.client";
import { Suspense } from "react";

// Server component for static content
export function StorageExample() {
  return (
    <div className="space-y-8">
      {/* Static content rendered on server */}
      <div>
        <h2 className="text-xl font-bold">Local Storage Demo</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Try changing these settings and reload the page - they&apos;ll
          persist!
        </p>

        {/* Client component wrapped in suspense with loading state */}
        <Suspense
          fallback={
            <div className="mt-6 space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          }
        >
          <StorageExampleClient />
        </Suspense>
      </div>

      {/* Static documentation section - always visible */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-bold mb-4">Implementation Guide</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <h3 className="font-medium mb-2">Basic Usage:</h3>
            <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded">
              {`import { useLocalStorage } from "@/lib/storage/storage";

function YourComponent() {
  const [value, setValue] = useLocalStorage("storage-key", defaultValue);

  // Use like regular state, but persists across reloads
  return (
    <button onClick={() => setValue(newValue)}>
      Current Value: {value}
    </button>
  );
}`}
            </pre>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
            <h3 className="font-medium mb-2">With Complex Objects:</h3>
            <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded">
              {`const [settings, setSettings] = useLocalStorage("user-settings", {
  theme: "light",
  notifications: true
});

// Update single property
setSettings(prev => ({
  ...prev,
  notifications: false
}));`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
