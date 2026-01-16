import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`p-2 -mx-1.5 border-none transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:text-yellow-600"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6  ${
          star <= rating ? "fill-yellow-500" : "fill-white"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;