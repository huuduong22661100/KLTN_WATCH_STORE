'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import styles from './ProductSort.module.css';

interface ProductSortProps {
  onSortChange: (filterName: string, value: string) => void;
}

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "price_asc", label: "Giá: Thấp đến Cao" },
  { value: "price_desc", label: "Giá: Cao đến Thấp" },
  { value: "name_asc", label: "Tên: A-Z" },
  { value: "name_desc", label: "Tên: Z-A" },
];

export default function ProductSort({ onSortChange }: ProductSortProps) {
  return (
    <Select onValueChange={(value) => onSortChange("sort", value)} defaultValue="default">
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue placeholder="Sắp xếp theo" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}