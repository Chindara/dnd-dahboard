import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { widgetRegistry } from '@/widgets/WidgetRegistry';
import { WidgetSheet } from '@/components/WidgetSheet'; // Import the new component
import { useResizeDetector } from 'react-resize-detector';
import { DashboardGrid } from '../components/DashboardGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabDialog from '../components/TabDialog';
import { Pencil } from 'lucide-react';
import { DashboardTab, DashboardWidget, WidgetKey } from '@/types/DashboardWidget';

const STORAGE_KEY = 'dashboard-widgets';

const DashboardForm = () => {
	const { width, ref } = useResizeDetector();
	const [editMode, setEditMode] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const [dashboardTabs, setDashboardTabs] = useState<DashboardTab[]>([{ id: 'panel1', label: 'WorkHub Overview', widgets: [] }]);
	const [activeTab, setActiveTab] = useState('panel1');
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
	const [renameTabLabel, setRenameTabLabel] = useState('');

	const handleAddTab = (label: string) => {
		if (!label.trim()) return;
		const newTab: DashboardTab = { id: `panel-${Date.now()}`, label, widgets: [] };
		setDashboardTabs([...dashboardTabs, newTab]);
		setActiveTab(newTab.id);
		setIsAddDialogOpen(false);
		handleDone();
	};

	const handleRenameTab = (newLabel: string) => {
		console.log('Renaming tab:', activeTab, 'to', newLabel);
		//setDashboardTabs((prev) => prev.map((tab) => (tab.id === activeTab ? { ...tab, label: newLabel } : tab)));

		const updated = dashboardTabs.map((t) => (t.id === activeTab ? { ...t, label: newLabel } : t));
		setDashboardTabs(updated);
		console.log('Current dashboard tabs:', updated);
		setIsRenameDialogOpen(false);
		setRenameTabLabel('');

		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	};

	// Open rename dialog for a specific tab
	const openRenameDialog = (tab: DashboardTab) => {
		setRenameTabLabel(tab.label);
		setActiveTab(tab.id); // make it active if not already
		setIsRenameDialogOpen(true);
	};

	// Load from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as DashboardTab[];
				setDashboardTabs(parsed);
			} catch {
				console.warn('Invalid dashboard data in localStorage');
			}
		}
	}, []);

	const handleAddWidget = (widgetKey: WidgetKey) => {
		if (!activeTab) return;
		const def = widgetRegistry[widgetKey];

		const newWidget: DashboardWidget = {
			key: Date.now().toString(),
			widgetKey,
			w: def.minW,
			h: def.minH,
			x: 0,
			y: Infinity, // lets react-grid-layout auto-place it
		};

		const updated = dashboardTabs.map((t) => (t.id === activeTab ? { ...t, widgets: [...t.widgets, newWidget] } : t));

		setDashboardTabs(updated);
	};

	// Save to localStorage when Done is clicked
	const handleDone = () => {
		console.log('Saving dashboard tabs to localStorage:', dashboardTabs);

		localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboardTabs));
		setEditMode(false);
		setDrawerOpen(false);
	};

	const handleLayoutChange = (dashboardWidgets: DashboardWidget[]) => {
		if (!activeTab) return;

		const updated = dashboardTabs.map((t) => (t.id === activeTab ? { ...t, widgets: dashboardWidgets } : t));
		setDashboardTabs(updated);
	};

	return (
		<div>
			{/* Header */}
			<div className='p-4 border-b flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>My Dashboard</h2>
			</div>

			<div className='flex justify-between'>
				<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
					<TabsList>
						{dashboardTabs.map((tab) => (
							<TabsTrigger key={tab.id} value={tab.id}>
								<div key={tab.id} className='flex items-center gap-2'>
									{tab.label}
									{tab.id === activeTab && (
										<Button variant='ghost' size='icon' className='size-6' onClick={() => openRenameDialog(tab)}>
											<Pencil className='size-4' />
										</Button>
									)}
								</div>
							</TabsTrigger>
						))}
						<Button variant='outline' size='sm' className='ml-2' onClick={() => setIsAddDialogOpen(true)}>
							➕ Add Dashboard
						</Button>
					</TabsList>

					{dashboardTabs.map((tab) => (
						<TabsContent key={tab.id} value={tab.id} className='h-full w-full mt-2'>
							<div ref={ref}>
								{width && <DashboardGrid width={width} editMode={editMode} dashboardWidgets={tab.widgets} onWidgetsChange={(widgets) => handleLayoutChange(widgets)} />}
							</div>
						</TabsContent>
					))}
				</Tabs>

				<Button
					onClick={
						editMode
							? handleDone
							: () => {
									setEditMode(true);
									setDrawerOpen(true);
								}
					}
				>
					{editMode ? 'Done' : 'Edit'}
				</Button>
			</div>

			{/* Add Tab Dialog */}
			<TabDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} title='Add New Dashboard' onSave={handleAddTab} />

			{/* Rename Tab Dialog */}
			<TabDialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen} title='Rename Dashboard' defaultValue={renameTabLabel} onSave={handleRenameTab} />

			{/* Widget Sheet Component */}
			<WidgetSheet open={drawerOpen} onOpenChange={setDrawerOpen} onAddWidget={handleAddWidget} />
		</div>
	);
};

export default DashboardForm;
