import { useState } from "react";

const API_BASE = "https://trafficbackend-9pj0.onrender.com";

export default function EmergencyPage() {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState<any>(null);
  const [error, setError] = useState("");

  const sendEmergencyAlert = async () => {
    setLoading(true);
    setError("");
    setAlertData(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const res = await fetch(`${API_BASE}/emergency/alert`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender: "User",
              latitude,
              longitude,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data?.message || "Failed to send emergency alert");
          }

          setAlertData(data);
        } catch (err: any) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        setError("Location access denied or unavailable");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Emergency Alert
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Tap the button below to send an emergency alert with your current coordinates.
        </p>

        <button
          onClick={sendEmergencyAlert}
          disabled={loading}
          className="rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Emergency Alert"}
        </button>

        {error && (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {alertData && (
          <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4">
            <h2 className="mb-2 text-lg font-semibold text-green-800">
              Emergency Alert Sent
            </h2>
            <p><strong>Sender:</strong> {alertData.sender}</p>
            <p><strong>Latitude:</strong> {alertData.coordinates.latitude}</p>
            <p><strong>Longitude:</strong> {alertData.coordinates.longitude}</p>
            <p><strong>Time:</strong> {alertData.timestamp}</p>
          </div>
        )}
      </div>
    </div>
  );
}