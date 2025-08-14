import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CircleArrowLeft } from 'lucide-react';

export function AverageCheckOutTile() {
	return (
		<Card className='flex flex-col h-full w-full p-0'>
			<CardHeader className='pb-0 flex flex-col items-start mb-2'>
				<CircleArrowLeft className='text-amber-900' />
			</CardHeader>
			<CardContent className='flex-1 space-y-2 min-h-0'>
				<p className='text-md text-gray-500'>Average check-out</p>
				<p className='text-3xl font-bold'>19:12 PM</p>
			</CardContent>
		</Card>
	);
}
