import React from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { CategoriesInfo } from "@/app/actions/getCategories";
import { useQueryState } from "nuqs";
interface FilterClientProps {
  categories: CategoriesInfo;
}
const FilterClient = ({ categories }: FilterClientProps) => {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });

  return (
    <div className="space-y-2 mb-6">
      <Label className="text-sm font-semibold text-gray-600">Category</Label>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={`${cat.id}`}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterClient;
