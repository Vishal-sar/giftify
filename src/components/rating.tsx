import { Star } from 'lucide-react';

export function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`h-4 w-4 ${index < value ? 'fill-current' : 'text-amber-200'}`} />
      ))}
    </div>
  );
}
