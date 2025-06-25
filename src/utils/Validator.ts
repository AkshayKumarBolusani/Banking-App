export function validateName(name: string): string | null {
  if (!name.trim()) return "Name is required.";
  if (name.length < 2) return "Name must be at least 2 characters.";
  return null;
}

export function validateAmount(amount: number): string | null {
  if (isNaN(amount) || amount <= 0) return "Amount must be greater than zero.";
  return null;
} 