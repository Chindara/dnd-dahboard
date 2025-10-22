import { create } from 'zustand';

type DashboardStore = {
	activeTab: string;
	dateRange: { from: string | Date | null, to: string | Date | null };
	setActiveTab: (tab: string) => void;
	setDateRange: (from: string | Date | null, to: string | Date | null) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
	activeTab: 'tab1',
	dateRange: { from: null, to: null },
	setActiveTab: (tab) => set({ activeTab: tab }),
	setDateRange: (from, to) => set({ dateRange: { from, to } }),
}));
