import { parseAsFloat, createLoader, parseAsString } from "nuqs/server";

export const coursesSearchParams = {
  search: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(coursesSearchParams);
