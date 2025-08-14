import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export function OnTimeArrivalTile() {
	return (
		<Card className='flex flex-col h-full w-full p-0'>
			<CardHeader className='pb-0 flex flex-col items-start mb-2'>
				<Clock className='text-green-500' />
			</CardHeader>
			<CardContent className='flex-1 space-y-2 min-h-0'>
				<p className='text-md text-gray-500'>On-time arrival</p>
				<p className='text-3xl font-bold'>98.56%</p>
			</CardContent>
		</Card>
	);
}
