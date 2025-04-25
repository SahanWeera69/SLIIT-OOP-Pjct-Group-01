"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [backgroundTheme, setBackgroundTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [feedbackTime, setFeedbackTime] = useState({ start: "09:00", end: "18:00" });
  const [verifyClientNames, setVerifyClientNames] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>

      <div className="mb-4">
        <label className="block mb-2">Background Theme:</label>
        <select
          className="border p-2"
          value={backgroundTheme}
          onChange={(e) => setBackgroundTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Notifications:</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Feedback Time:</label>
        <input
          type="time"
          value={feedbackTime.start}
          onChange={(e) => setFeedbackTime({ ...feedbackTime, start: e.target.value })}
        />
        <span className="mx-2">to</span>
        <input
          type="time"
          value={feedbackTime.end}
          onChange={(e) => setFeedbackTime({ ...feedbackTime, end: e.target.value })}
        />
      </div>
      <div className="mb-4">
          <label className="block mb-2">Verify Client Names:</label>
          <input type="checkbox" checked={verifyClientNames} onChange={(e) => setVerifyClientNames(e.target.checked)} />
        </div>
    </div>
  );
}
