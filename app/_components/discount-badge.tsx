import { ArrowDown } from "lucide-react";

interface DiscountBadgeProps {
  discountPercentage: number;
}

const DiscountBadge = ({ discountPercentage }: DiscountBadgeProps) => {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDown size={12} />
      <span className="text-xs font-semibold">{discountPercentage}%</span>
    </div>
  );
};

export default DiscountBadge;
