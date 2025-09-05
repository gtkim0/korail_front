export interface BaseModalFormProps<T> {
  editData: T | null;
  onCanSubmitChange: (v: boolean) => void;
  isOpen?: boolean;
}

export interface PageServerProps {
  initialFilter: Record<string, any>;
  initialData: any;
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

export interface PageProps {
  page: number;
  pagePerSize: number;
}

export interface NormalizeResponseType<T> {
  list: T;
  totalCount: number;
}

export interface PaginationResponseType<T> extends PageProps {
  list: T[];
  totalCount: number;
}
