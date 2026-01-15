"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "../ui/slider";

export default function EmbedButtonEditor({
  soundId,
  initialText,
}: {
  soundId: string;
  initialText: string;
}) {
  // --- State for all editable properties ---
  const [text, setText] = useState(initialText);
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#1f2937");
  const [fontSize, setFontSize] = useState(16);
  const [paddingX, setPaddingX] = useState(12);
  const [paddingY, setPaddingY] = useState(8);
  const [borderColor, setBorderColor] = useState("#374151");
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderRadius, setBorderRadius] = useState(8);

  // --- Generate inline style object for live preview ---
  const buttonStyle = useMemo(
    () => ({
      color: textColor,
      backgroundColor: bgColor,
      fontSize: `${fontSize}px`,
      padding: `${paddingY}px ${paddingX}px`,
      border: `${borderWidth}px solid ${borderColor}`,
      borderRadius: `${borderRadius}px`,
      cursor: "pointer",
    }),
    [
      textColor,
      bgColor,
      fontSize,
      paddingX,
      paddingY,
      borderColor,
      borderWidth,
      borderRadius,
    ]
  );

  // --- Generate iframe code ---
  const iframeCode = useMemo(() => {
    const styleString = `color: ${textColor}; background-color: ${bgColor}; font-size: ${fontSize}px; padding: ${paddingY}px ${paddingX}px; border: ${borderWidth}px solid ${borderColor}; border-radius: ${borderRadius}px; cursor: pointer;`;
    return `<iframe src="https://your-site.com/embed/${soundId}" style="border:none;width:auto;height:auto;">
      <button style="${styleString}">${text}</button>
    </iframe>`;
  }, [
    soundId,
    text,
    textColor,
    bgColor,
    fontSize,
    paddingX,
    paddingY,
    borderColor,
    borderWidth,
    borderRadius,
  ]);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
      {/* Live preview */}
      <div className="flex justify-center">
        <button style={buttonStyle}>{text}</button>
      </div>

      {/* Text input */}
      <Label>Button Text</Label>
      <Input value={text} onChange={(e) => setText(e.target.value)} />

      {/* Color pickers */}
      <div className="flex gap-4 flex-wrap">
        <div>
          <Label>Text Color</Label>
          <Input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>
        <div>
          <Label>Background Color</Label>
          <Input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <div>
          <Label>Border Color</Label>
          <Input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-4">
        <SliderControl
          label="Font Size"
          value={fontSize}
          max={48}
          onChange={setFontSize}
        />
        <SliderControl
          label="Padding X"
          value={paddingX}
          max={50}
          onChange={setPaddingX}
        />
        <SliderControl
          label="Padding Y"
          value={paddingY}
          max={50}
          onChange={setPaddingY}
        />
        <SliderControl
          label="Border Width"
          value={borderWidth}
          max={20}
          onChange={setBorderWidth}
        />
        <SliderControl
          label="Border Radius"
          value={borderRadius}
          max={50}
          onChange={setBorderRadius}
        />
      </div>

      {/* Iframe code output */}
      <div className="flex flex-col gap-2">
        <Label>Copy your iframe code</Label>
        <textarea
          readOnly
          className="w-full h-32 p-2 border rounded"
          value={iframeCode}
        />
      </div>
    </div>
  );
}

// --- Slider wrapper component ---
function SliderControl({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span>
        {label}: {value}px
      </span>
      <Slider
        value={[value]}
        max={max}
        step={1}
        onValueChange={(val) => onChange(val[0])}
        className="w-full"
      />
    </div>
  );
}
