import { useColors } from "@/features/products/hook/useColors";
import { useCategories } from "@/features/products/hook/useCategories";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProductFiltersProps {
  onFilterChange: (filterName: string, value: string | number) => void;
}

const priceRanges = [
  { value: 'all', label: 'Tất cả' },
  { value: '0-10000000', label: 'Dưới 10 triệu' },
  { value: '10000000-15000000', label: '10 - 15 triệu' },
  { value: '15000000-20000000', label: '15 - 20 triệu' },
  { value: '20000000-25000000', label: '20 - 25 triệu' },
  { value: '25000000-999999999', label: 'Trên 25 triệu' },
];

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const { data: categoriesData } = useCategories();
  const { data: colorsData } = useColors();

  const categories = categoriesData?.data || [];
  const colors = colorsData?.data || [];

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
    <div className="space-y-8">
      {/* Search Input */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Tìm kiếm</h3>
        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Danh mục sản phẩm</h3>
        <RadioGroup onValueChange={(value) => onFilterChange("category", value)} defaultValue="">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="cat-all" />
            <Label htmlFor="cat-all" className="font-normal cursor-pointer">Tất cả</Label>
          </div>
          {categories.map((category: any) => (
            <div key={category._id} className="flex items-center space-x-2">
              <RadioGroupItem value={category._id} id={category._id} />
              <Label htmlFor={category._id} className="font-normal cursor-pointer">
                {category.category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Color Filter */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Màu sắc</h3>
        <RadioGroup onValueChange={(value) => onFilterChange("color", value)} defaultValue="">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="color-all" />
            <Label htmlFor="color-all" className="font-normal cursor-pointer">Tất cả</Label>
          </div>
          {colors.map((color: any) => (
            <div key={color._id} className="flex items-center space-x-2">
              <RadioGroupItem value={color._id} id={color._id} />
              <Label htmlFor={color._id} className="font-normal cursor-pointer">{color.color}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price Filter */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Mức giá</h3>
        <RadioGroup onValueChange={handlePriceRangeChange} defaultValue="all">
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <RadioGroupItem value={range.value} id={range.value} />
              <Label htmlFor={range.value} className="font-normal cursor-pointer">{range.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}