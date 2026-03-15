import type React from 'react';

type MetadataFieldProps = {
  label: string;
  value: unknown;
  stripped?: boolean;
};

function hasRenderableValue(value: unknown): boolean {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

function formatMetadataValue(value: unknown): string {
  return String(value);
}

export function MetadataField({ label, value, stripped }: MetadataFieldProps): React.JSX.Element {
  const hasValue = hasRenderableValue(value);
  const displayValue = hasValue ? formatMetadataValue(value) : stripped ? '—' : '✓ removed';
  return (
    <div className="mb-2">
      <div className="text-[10px] uppercase tracking-[0.05em] text-mid font-(--font-mono)">
        {label}
      </div>
      <div className={`text-[11px] font-(--font-mono) ${
        stripped && hasValue ? 'text-green-dim line-through opacity-60' : 'text-green-dim italic'
      }`}>
        {displayValue}
      </div>
    </div>
  );
}