import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 1-5
  size?: number;
  showNumber?: boolean;
}

export function StarRating({ rating, size = 16, showNumber = false }: StarRatingProps) {
  // Round rating to nearest integer for star display
  const roundedRating = Math.round(rating);
  
  return (
    <div className="flex items-center gap-[4px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          style={{
            fill: star <= roundedRating ? '#FFC107' : '#e5e7eb',
            color: star <= roundedRating ? '#FFC107' : '#e5e7eb',
            stroke: star <= roundedRating ? '#FFC107' : '#e5e7eb'
          }}
        />
      ))}
      {showNumber && (
        <span className="text-[14px] text-[#6b7280] ml-[4px]">
          ({rating}/5)
        </span>
      )}
    </div>
  );
}
