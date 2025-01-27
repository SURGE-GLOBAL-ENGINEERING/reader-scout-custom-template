#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Helper function to replace content in files
function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");

  for (const [search, replace] of Object.entries(replacements)) {
    content = content.replace(new RegExp(search, "g"), replace);
  }

  fs.writeFileSync(filePath, content);
}

// Main setup function
function setupAuthorWebsite(projectName, authorName) {
  const projectPath = path.resolve(projectName);
  const siteName = authorName.replace(/\s+/g, "-").toLowerCase();

  // Update package.json
  const packageJsonPath = path.join(projectPath, "package.json");
  replaceInFile(packageJsonPath, {
    "author-website-boilerplate": siteName,
    "Author Website Boilerplate": `${authorName}'s Author Website`,
  });

  // Update site configuration
  const siteConfigPath = path.join(projectPath, "src", "config", "site.ts");
  replaceInFile(siteConfigPath, {
    "Author Website": `${authorName}'s Website`,
    "Official website for \\[Author Name\\]": `Official website for ${authorName}`,
    "https://your-domain.com": `https://${siteName}.com`,
  });

  // Create .env.sample file
  const envSampleContent = `# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_DOMAIN=example.com`;

  fs.writeFileSync(path.join(projectPath, ".env.sample"), envSampleContent);

  // Initialize git repository
  try {
    execSync("git init", { cwd: projectPath, stdio: "ignore" });
    execSync("git add .", { cwd: projectPath, stdio: "ignore" });
    execSync('git commit -m "Initial commit: Author website setup"', {
      cwd: projectPath,
      stdio: "ignore",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    console.warn("Could not initialize git repository.");
  }

  // Install dependencies
  try {
    console.log("Installing dependencies...");
    execSync("npm install", { cwd: projectPath, stdio: "inherit" });
  } catch (error) {
    console.error("Dependency installation failed:", error);
  }

  console.log(`
🎉 ${authorName}'s Author Website Setup Complete! 

Next steps:
1. cd ${projectName}
2. Copy .env.sample to .env.local and update the values
3. npm run dev
4. Start customizing in src/config/site.ts

Happy coding! 🚀
  `);
}

// Export for CLI usage
export default setupAuthorWebsite;
