import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface WidgetCardProps {
	title: string;
	count?: number;
	unit?: string;
	children: React.ReactNode;
	footer?: string;
}

type SizeMode = 'large' | 'medium' | 'small';

export function WidgetCard({ title, count, unit, children, footer }: WidgetCardProps) {
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
		<Card ref={cardRef} className='flex flex-col h-full w-full p-0' data-size-mode={sizeMode}>
			{sizeMode !== 'small' && (
				<CardHeader className='pb-0 flex flex-col items-start mb-2'>
					<CardTitle className='text-xl md:text-lg'>{title}</CardTitle>
					{count !== undefined && unit && (
						<div className='flex items-end space-x-2'>
							<h1 className='text-3xl text-pretty font-bold tracking-tighter'>{count}</h1>
							<span className='text-sm text-gray-500'>{unit}</span>
						</div>
					)}
				</CardHeader>
			)}
			<CardContent className='flex-1 min-h-0'>{children}</CardContent>

			{footer && (
				<CardFooter className='pt-0 text-gray-800 gap-2'>
					<CheckCircle className='h-4 w-4 text-green-700' /> {footer}
				</CardFooter>
			)}
		</Card>
	);
}
