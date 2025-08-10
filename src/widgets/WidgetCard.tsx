import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WidgetCardProps {
	title: string;
	count?: number;
	unit?: string;
	children: React.ReactNode;
}

type SizeMode = 'large' | 'medium' | 'small';

export function WidgetCard({ title, count, unit, children }: WidgetCardProps) {
	const [sizeMode, setSizeMode] = useState<SizeMode>('large');
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!cardRef.current) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = entry.contentRect.width;
				const height = entry.contentRect.height;

				// Define size thresholds
				if (width > 300 && height > 250) {
					setSizeMode('large');
				} else if (width > 200 && height > 180) {
					setSizeMode('medium');
				} else {
					setSizeMode('small');
				}
			}
		});

		resizeObserver.observe(cardRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<Card ref={cardRef} className='flex flex-col h-full w-full pb-1'>
			{sizeMode !== 'small' && (
				<CardHeader className='pb-0 flex flex-col items-start'>
					<div className='flex items-center space-x-2'>
						<CardTitle className='text-xl md:text-lg'>{title}</CardTitle>
					</div>
					<div className='flex items-end space-x-2'>
						<h1 className='text-3xl text-pretty font-bold tracking-tighter'>{count}</h1>
						<span className='text-sm text-gray-500'>{unit}</span>
					</div>
				</CardHeader>
			)}
			<CardContent className='flex-1 min-h-0'>{children}</CardContent>
		</Card>
	);
}
