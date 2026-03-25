"use client";

import { useState } from "react";
import AutoPlayRandom from "./AutoPlayRandom";
import { Button } from "@/components/ui/button";

export default function RandomSound({ cdnUrl }: { cdnUrl: string }) {
  const [sound, setSound] = useState<any>(null);

  const loadRandom = async () => {
    const res = await fetch("/api/sounds/random");
    const data = await res.json();
    setSound(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button variant="accent" onClick={loadRandom}>
        Check a random sound
      </Button>

      <AutoPlayRandom sound={sound} cdnUrl={cdnUrl} />
    </div>
  );
}
