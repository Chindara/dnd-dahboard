import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TabDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	defaultValue?: string;
	onSave: (value: string) => void;
}

export default function TabDialog({ open, onOpenChange, title, defaultValue = '', onSave }: TabDialogProps) {
	const [inputValue, setInputValue] = useState(defaultValue);

	useEffect(() => {
		setInputValue(defaultValue);
	}, [defaultValue]);

	const handleSave = () => {
		console.log('Saving tab:', inputValue);
		if (!inputValue.trim()) return;
		onSave(inputValue);
		setInputValue('');
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className='space-y-4'>
					<Input placeholder='Tab name' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
