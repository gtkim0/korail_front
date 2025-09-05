import {create} from "zustand";

interface AlarmState {
    isOn: boolean;
    toggle: (value?: boolean) => void;
}

export const useAlarmStore = create<AlarmState>((set) => ({
    isOn: false,
    toggle: (value) =>
        set((state) => ({
            isOn: typeof value === "boolean" ? value : !state.isOn,
        })),
}));