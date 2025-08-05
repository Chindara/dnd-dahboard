import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface WidgetCardProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function WidgetCard({ title, description, children }: WidgetCardProps) {
	return (
		<Card className='flex flex-col h-full w-full pl-2 pr-2 pb-2'>
			<CardHeader className='pb-2'>
				<CardTitle className='text-sm md:text-base'>{title}</CardTitle>
				{description && <CardDescription className='text-xs'>{description}</CardDescription>}
			</CardHeader>
			<CardContent className='flex-1 min-h-0 p-2'>{children}</CardContent>
		</Card>
	);
}
