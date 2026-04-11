export interface AvatarProps {
  name?: string | null;
  email?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes: Record<string, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const colors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-indigo-500",
];

function getColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name?: string | null, email?: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "?";
}

export function Avatar({
  name,
  email,
  size = "md",
  className = "",
}: AvatarProps) {
  const initials = getInitials(name, email);
  const bg = getColor(name ?? email ?? "default");

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-medium text-white ${bg} ${sizes[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
