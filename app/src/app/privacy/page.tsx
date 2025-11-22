"use client";
import React from "react";

// Replace placeholders below:
const APP_NAME = "Widgets Crate";
const OWNER_NAME = "Filippo Grochala";
const LAST_UPDATED_DATE = "22/11/2025";
const CONTACT_EMAIL = "filippodude@gmail.com";

// Define all sections and content once
const SECTIONS = [
  {
    title: "1. Data Collected Automatically",
    content: `The App collects only technical and anonymous data required for its operation.`,
  },
  {
    title: "1.1 Anonymous User ID",
    content: `The App generates a random, anonymous user ID used solely to prevent abuse, limit API requests, manage server load, and generate anonymous statistics. Users cannot create or manage an account.`,
  },
  {
    title: "2. Data Sent Through the API",
    content: `When users enter a Minecraft server IP or hostname, this data is sent to our API, is not stored, and is only used to retrieve server information. Data is never linked to personal user information.`,
  },
  {
    title: "3. Analytics",
    content: `The App collects minimal anonymous analytics: widget type added to the home screen, day of addition (not time), and total number of widgets.`,
  },
  {
    title: "4. Firebase",
    content: `The App uses Firebase, which may generate an anonymous Firebase Installation ID and collects anonymous usage and technical device data.`,
  },
  {
    title: "5. Data Not Collected",
    content: `The App does NOT collect real names, emails, phone numbers, passwords, precise location, sensitive personal info, or messages between users.`,
  },
  {
    title: "6. External Links",
    content: `The App may include external links, such as Discord or GitHub, which have their own privacy policies. Users should review them separately.`,
  },
  {
    title: "7. Data Sharing",
    content: `Data collected is not shared with third parties, except for Firebase services, hosting provider, or legal obligations. Data is never sold or traded.`,
  },
  {
    title: "8. Data Security",
    content: `Anonymous technical data is protected using HTTPS encryption, server firewall, and Firebase security systems.`,
  },
  {
    title: "9. User Rights (GDPR)",
    content: `Because no personal data is collected, users cannot be identified. Users can contact the owner for clarification. Contact: ${CONTACT_EMAIL}`,
  },
  {
    title: "10. Changes to This Privacy Policy",
    content: `This Privacy Policy may be updated. Significant changes will be reflected in the App or webpage.`,
  },
  {
    title: "11. Contact Information",
    content: `For privacy inquiries, contact: ${CONTACT_EMAIL}`,
  },
];

export default function PrivacyPolicyPage() {
  const generateHTML = () => {
    const sectionHTML = SECTIONS.map(
      (s) => `<h2>${s.title}</h2><p>${s.content}</p>`
    ).join("\n");
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Privacy Policy - ${APP_NAME}</title>
<style>
body { font-family: Arial, sans-serif; padding: 20px; color: black; }
h1, h2, h3, p, li { color: black; }
</style>
</head>
<body>
<h1>Privacy Policy – ${APP_NAME}</h1>
<p><strong>Last updated:</strong> ${LAST_UPDATED_DATE}</p>
<p>This Privacy Policy explains how <strong>${APP_NAME}</strong> handles user data. The App is developed by <strong>${OWNER_NAME}</strong>.</p>
${sectionHTML}
</body>
</html>`;
  };

  const handleDownload = () => {
    const blob = new Blob([generateHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "privacy_policy.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateHTML());
    alert("HTML copied to clipboard!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy – {APP_NAME}</h1>
      <p className="mb-4 font-semibold">Last updated: {LAST_UPDATED_DATE}</p>

      <div className="space-y-6">
        <p>
          This Privacy Policy explains how <strong>{APP_NAME}</strong> handles
          user data. The App is developed by <strong>{OWNER_NAME}</strong>.
        </p>
        {SECTIONS.map((s, idx) => (
          <section key={idx}>
            <h2 className="text-xl font-bold mb-2">{s.title}</h2>
            <p>{s.content}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:opacity-80"
        >
          Copy HTML
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:opacity-80"
        >
          Download HTML
        </button>
      </div>
    </div>
  );
}
