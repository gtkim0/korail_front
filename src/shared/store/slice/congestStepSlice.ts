import {create} from 'zustand';
import {TPtlDgcnCrtrmsType} from "@/types/setting";


interface CongestStepSlice {
    congestStep: TPtlDgcnCrtrmsType[];
    setCongestStep: (steps: TPtlDgcnCrtrmsType[]) => void;
}

export const useCongestStepStore = create<CongestStepSlice>((set) => ({
    congestStep: [], // 초기값
    setCongestStep: (steps) => set({congestStep: steps}),
}));