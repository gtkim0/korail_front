export interface BaseModalFormProps<T> {
  editData: T | null;
  onCanSubmitChange: (v: boolean) => void;
}

export interface PageServerProps {
  initialFilter: Record<string, any>;
  initialData: any[];
  initialSortKey?: string;
}

export type FormAddFormRef = {
  submit: () => Promise<any>;
};

export interface ResponseType<T> {
  resultCode: string;
  resultMessage: string;
  result: T;
}

export interface PaginationResponseType<T> {
  list: T[];
  page: number;
  pagePerSize: number;
  totalCount: number;
}