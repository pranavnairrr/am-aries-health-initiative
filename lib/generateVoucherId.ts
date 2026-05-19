export function generateVoucherId(sequenceNumber: number): string {
  return `AM-${String(sequenceNumber).padStart(4, "0")}`;
}
