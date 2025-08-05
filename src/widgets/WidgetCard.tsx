import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface WidgetCardProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

type SizeMode = 'large' | 'medium' | 'small';

export function WidgetCard({ title, description, children }: WidgetCardProps) {
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
		<Card ref={cardRef} className='flex flex-col h-full w-full pb-2'>
			{/* Show header only for large and medium sizes */}
			{sizeMode !== 'small' && (
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm md:text-base'>{title}</CardTitle>
					{description && sizeMode === 'large' && <CardDescription className='text-xs'>{description}</CardDescription>}
				</CardHeader>
			)}

			{/* Content area expands based on available space */}
			<CardContent className={`flex-1 min-h-0 ${sizeMode === 'small' ? 'p-1' : 'p-2'}`}>{children}</CardContent>

			{/* Show footer with title only for small size */}
			{/* {sizeMode === 'small' && (
				<CardFooter className='p-2 pt-1'>
					<p className='text-xs font-medium truncate w-full'>{title}</p>
				</CardFooter>
			)} */}
		</Card>
	);
}
