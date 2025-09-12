import {create} from "zustand";

interface AlarmSlice {
    isOn: boolean;
    toggle: (value?: boolean) => void;
}

export const useAlarmStore = create<AlarmSlice>((set) => ({
    isOn: false,
    toggle: (value) =>
        set((state) => ({
            isOn: typeof value === "boolean" ? value : !state.isOn,
        })),
}));