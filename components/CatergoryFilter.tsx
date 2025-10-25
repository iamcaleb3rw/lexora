import React from "react";
import FilterClient from "./FilterClient";
import { CategoriesInfo, getCategories } from "@/app/actions/getCategories";

const CatergoryFilter = ({ categories }: { categories: CategoriesInfo }) => {
  return <FilterClient categories={categories} />;
};

export default CatergoryFilter;
