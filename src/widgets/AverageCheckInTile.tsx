import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CircleArrowRight } from 'lucide-react';

export function AverageCheckInTile() {
	return (
		<Card className='flex flex-col h-full w-full p-0'>
			<CardHeader className='pb-0 flex flex-col items-start mb-2'>
				<CircleArrowRight className='text-primary' />
			</CardHeader>
			<CardContent className='flex-1 space-y-2 min-h-0'>
				<p className='text-md text-gray-500'>Average check-in</p>
				<p className='text-3xl font-bold'>10:33 AM</p>
			</CardContent>
		</Card>
	);
}
