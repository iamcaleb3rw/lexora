import { createContext, useContext } from "react";

type CompanyContextType = {
  companyId: string;
  setCompanyId: (id: string) => void;
};

export const CompanyContext = createContext<CompanyContextType | undefined>(
  undefined
);

export const useCompany = () => {
  const context = useContext(CompanyContext);
};
