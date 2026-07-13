type RefundAPIResponse = {
  id: string;
  name: string;
  category: CategoriesAPIEnum;
  amount: number;
  date: Date;
  filename: string;
  user: {
    name: string;
  };
};

type RefundsPaginationAPIResponse = {
  refunds: RefundAPIResponse[];
  pagination: {
    total: number;
    Page: number;
    perPage: number;
    totalPages: number;
    totalRecords: number;
  };
};
