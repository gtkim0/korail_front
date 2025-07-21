import {StationInfoColumnsType} from "@/features/history-info/columns/historyInfoColumns";

export interface BaseModalFormProps<T> {
  editData: T | null;
  onCanSubmitChange: (v: boolean) => void;
}

export interface PageServerProps {
  initialFilter: Record<string, any>;
  initialData: StationInfoColumnsType[];
  initialSortKey?: string;
}

export type FormAddFormRef = {
  submit: () => Promise<any>;
};