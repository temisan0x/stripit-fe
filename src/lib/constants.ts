export const LOG_MESSAGES = [
  "> Scanning file headers...",
  "> Reading EXIF data...",
  "> Detecting GPS coordinates...",
  "> Found device metadata...",
  "> Stripping location tags...",
  "> Removing timestamp data...",
  "> Clearing device fingerprint...",
  "> Sanitizing file headers...",
  "> Uploading clean file...",
  "> Verifying integrity...",
];

export const FIELDS = [
  { key: "GPS", label: "Location" },
  { key: "date", label: "Date" },
  { key: "device", label: "Device" },
  { key: "encoder", label: "Encoder" },
  { key: "software", label: "Software" },
  { key: "location", label: "GPS Tag" },
];

export const MAX_UPLOAD_SIZE_MB = 30;
export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;