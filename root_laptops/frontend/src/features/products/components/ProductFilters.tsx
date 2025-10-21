import { useColors } from "@/features/products/hook/useColors";
import { useCategories } from "@/features/products/hook/useCategories";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import styles from './ProductFilters.module.css';

interface ProductFiltersProps {
  onFilterChange: (filterName: string, value: string | number) => void;
  initialCategory?: string;
  initialColor?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
}

const priceRanges = [
  { value: 'all', label: 'Tất cả' },
  { value: '0-10000000', label: 'Dưới 10 triệu' },
  { value: '10000000-15000000', label: '10 - 15 triệu' },
  { value: '15000000-20000000', label: '15 - 20 triệu' },
  { value: '20000000-25000000', label: '20 - 25 triệu' },
  { value: '25000000-999999999', label: 'Trên 25 triệu' },
];

export default function ProductFilters({ 
  onFilterChange,
  initialCategory = '',
  initialColor = '',
  initialMinPrice = '',
  initialMaxPrice = '',
}: ProductFiltersProps) {
  const { data: categoriesData } = useCategories();
  const { data: colorsData } = useColors();

  const categories = categoriesData?.data || [];
  const colors = colorsData?.data || [];
  
  const getInitialPriceRange = () => {
    if (!initialMinPrice && !initialMaxPrice) return 'all';
    const priceKey = `${initialMinPrice}-${initialMaxPrice}`;
    const found = priceRanges.find(r => r.value === priceKey);
    return found ? found.value : 'all';
  };

  const handlePriceRangeChange = (value: string) => {
    if (value === 'all') {
      onFilterChange("minPrice", "");
      onFilterChange("maxPrice", "");
      return;
    }
    const [min, max] = value.split('-').map(Number);
    onFilterChange("minPrice", min);
    onFilterChange("maxPrice", max);
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>
          <svg className={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Tìm kiếm
        </h3>
        <Input
          type="text"
          placeholder="Nhập tên sản phẩm..."
          onChange={(e) => onFilterChange("search", e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>
          <svg className={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Danh mục
        </h3>
        <RadioGroup onValueChange={(value) => onFilterChange("category", value)} value={initialCategory}>
          <div className={styles.radioItem}>
            <RadioGroupItem value="" id="cat-all" />
            <Label htmlFor="cat-all" className={styles.radioLabel}>Tất cả danh mục</Label>
          </div>
          {categories.map((category: any) => (
            <div key={category._id} className={styles.radioItem}>
              <RadioGroupItem value={category._id} id={category._id} />
              <Label htmlFor={category._id} className={styles.radioLabel}>
                {category.category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>
          <svg className={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Mức giá
        </h3>
        <RadioGroup onValueChange={handlePriceRangeChange} value={getInitialPriceRange()}>
          {priceRanges.map((range) => (
            <div key={range.value} className={styles.radioItem}>
              <RadioGroupItem value={range.value} id={range.value} />
              <Label htmlFor={range.value} className={styles.radioLabel}>{range.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>
          <svg className={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Màu sắc
        </h3>
        <RadioGroup onValueChange={(value) => onFilterChange("color", value)} value={initialColor}>
          <div className={styles.radioItem}>
            <RadioGroupItem value="" id="color-all" />
            <Label htmlFor="color-all" className={styles.radioLabel}>Tất cả màu</Label>
          </div>
          {colors.map((color: any) => (
            <div key={color._id} className={styles.radioItem}>
              <RadioGroupItem value={color._id} id={color._id} />
              <Label htmlFor={color._id} className={styles.radioLabel}>{color.color}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}