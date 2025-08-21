import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetKey, widgetRegistry } from '@/widgets/WidgetRegistry';
import { WidgetSheet } from '@/components/WidgetSheet'; // Import the new component
import { useResizeDetector } from 'react-resize-detector';
import { DashboardGrid } from '../components/DashboardGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type DashboardWidget = {
	key: string;
	widgetKey: WidgetKey;
	w: number;
	h: number;
	x: number;
	y: number;
};

type DashboardTab = {
	id: string;
	label: string;
	widgets: DashboardWidget[];
};

const STORAGE_KEY = 'dashboard-widgets';

const DashboardForm = () => {
	const { width, ref } = useResizeDetector();
	const [editMode, setEditMode] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const [dashboardTabs, setDashboardTabs] = useState<DashboardTab[]>([{ id: 'panel1', label: 'Panel 1', widgets: [] }]);
	const [activeTab, setActiveTab] = useState('panel1');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newTabLabel, setNewTabLabel] = useState('');

	const handleAddTab = () => {
		if (!newTabLabel.trim()) return;

		const newId = `panel-${Date.now()}`;
		setDashboardTabs([...dashboardTabs, { id: newId, label: newTabLabel, widgets: [] }]);
		setActiveTab(newId);
		setIsDialogOpen(false);
		setNewTabLabel('');
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
								{tab.label}
							</TabsTrigger>
						))}
						<Button variant='outline' size='sm' className='ml-2' onClick={() => setIsDialogOpen(true)}>
							+ Add Tab
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

			{/* Popup Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Tab</DialogTitle>
					</DialogHeader>
					<div className='space-y-4'>
						<Input placeholder='Tab name' value={newTabLabel} onChange={(e) => setNewTabLabel(e.target.value)} />
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleAddTab}>Add</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Widget Sheet Component */}
			<WidgetSheet open={drawerOpen} onOpenChange={setDrawerOpen} onAddWidget={handleAddWidget} />
		</div>
	);
};

export default DashboardForm;
