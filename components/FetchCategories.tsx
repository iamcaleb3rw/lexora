"use client";

import { useId, useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { toast } from "sonner";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

interface SelectCategoriesProps {
  name: string;
}

async function fetchCategories(): Promise<Option[]> {
  try {
    const res = await axios.get("/api/fetchcategories");
    return res.data.map((cat: { id: number; name: string }) => ({
      value: String(cat.id),
      label: cat.name,
    }));
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    toast.error("Failed to load categories");
    return [];
  }
}

export default function SelectCategories({ name }: SelectCategoriesProps) {
  const id = useId();
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const { control, watch } = useFormContext();

  useEffect(() => {
    let mounted = true;
    fetchCategories().then((cats) => {
      if (mounted) {
        setOptions(cats);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Get current form values
  const formValues = watch(name) || [];

  if (loading) {
    return <Skeleton className="h-8 w-full" />;
  }

  // Convert form values (which might be string IDs) to full Option objects
  const selectedOptions = options.filter(
    (opt) =>
      formValues.includes(opt.value) ||
      (Array.isArray(formValues) &&
        formValues.some((v: Option) => v.value === opt.value))
  );

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Categories</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MultipleSelector
            value={selectedOptions}
            onChange={(selected: Option[]) => {
              // Store just the values in the form
              field.onChange(selected.map((opt) => opt.value));
            }}
            defaultOptions={options}
            placeholder="Select categories"
            emptyIndicator={
              <p className="text-center text-sm">No results found</p>
            }
            inputProps={{
              id,
              autoComplete: "off",
            }}
            hideClearAllButton
            hidePlaceholderWhenSelected
            onSearch={async (search) => {
              const res = await axios.get(
                `/api/fetchcategories?search=${search}`
              );
              return res.data.map((cat: { id: number; name: string }) => ({
                value: String(cat.id),
                label: cat.name,
              }));
            }}
          />
        )}
      />
      <p className="text-muted-foreground mt-2 text-xs">
        Search and select one or multiple categories
      </p>
    </div>
  );
}
