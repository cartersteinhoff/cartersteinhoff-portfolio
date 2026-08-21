"use client";

import { useEffect, useState } from "react";

const phoenixTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Phoenix",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

export function PhoenixTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();

    const intervalId = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <time dateTime={now?.toISOString()}>
      {now ? `Phoenix time · ${phoenixTimeFormatter.format(now)}` : "Phoenix time"}
    </time>
  );
}
