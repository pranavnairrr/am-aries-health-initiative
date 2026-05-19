// Unambiguous chars — no 0/O, 1/I confusion
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateVoucherId(): string {
  let code = "AM-";
  for (let i = 0; i < 8; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return code;
}
