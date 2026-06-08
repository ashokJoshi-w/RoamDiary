import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function DestinationsWidget() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // name of expanded destination

  useEffect(() => {
    axiosInstance
      .get("/get-destinations")
      .then((res) => setDestinations(res.data.destinations || []))
      .catch((err) => console.error("Destinations fetch failed", err))
      .finally(() => setLoading(false));
  }, []);

  const maxCount = destinations[0]?.count || 1;

  if (loading) {
    return (
      <div className="rd-widget">
        <p className="rd-widget-label">Destinations</p>
        <p style={{ fontSize: 12, color: "#8896AE" }}>Loading…</p>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="rd-widget">
        <p className="rd-widget-label">Destinations</p>
        <p style={{ fontSize: 12, color: "#8896AE" }}>
          No destinations yet. Add locations to your stories!
        </p>
      </div>
    );
  }

  return (
    <div className="rd-widget">
      <p className="rd-widget-label">Destinations</p>

      {destinations.map((dest) => (
        <div key={dest.name}>
          <div
            className="rd-dest-row"
            style={{ cursor: "pointer" }}
            onClick={() =>
              setExpanded(expanded === dest.name ? null : dest.name)
            }
          >
            {/* Icon */}
            <div className="rd-dest-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#2E7DBA" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>

            {/* Name + bar */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="rd-dest-name">{dest.name}</div>
              <div className="rd-dest-bar-wrap">
                <div
                  className="rd-dest-bar"
                  style={{ width: `${(dest.count / maxCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Count + chevron */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="rd-dest-count">
                {dest.count} {dest.count === 1 ? "story" : "stories"}
              </span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#8896AE" strokeWidth="2"
                style={{
                  transform: expanded === dest.name ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Expanded story list */}
          {expanded === dest.name && (
            <div style={{
              marginBottom: 8,
              borderRadius: 10,
              overflow: "hidden",
              border: "1.5px solid #E4EAF4",
            }}>
              {dest.stories.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderBottom: i < dest.stories.length - 1 ? "1px solid #F0F4FA" : "none",
                    background: "#FAFBFD",
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, overflow: "hidden",
                    background: "#E8EDF5", flexShrink: 0,
                  }}>
                    {s.imageUrl ? (
                      <img
                        src={s.imageUrl}
                        alt={s.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="#8896AE" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="3"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Title + date */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 500, color: "#0F1828",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: 11, color: "#8896AE", marginTop: 1 }}>
                      {new Date(s.visitedDate).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}