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
  code: number;
  message: string;
  data: T;
}