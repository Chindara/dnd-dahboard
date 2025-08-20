import { StatCard } from '@/components/StatCard';
import { ClockArrowUp } from 'lucide-react';

export function AverageHoursTile() {
	return <StatCard title='Average hours' value='7h 17m' change={{ percentage: 10, absolute: 213 }} icon={ClockArrowUp} iconColor='orange' />;

	// return (
	// 	<Card className='flex flex-col h-full w-full p-0'>
	// 		<CardHeader className='border pb-0 flex flex-col items-start mb-2'>
	// 			<ClockArrowUp className='text-primary' />
	// 		</CardHeader>
	// 		<CardContent className='border flex-1 space-y-2 min-h-0'>
	// 			<p className='text-md text-gray-500'>Average hours</p>
	// 			<p className='text-3xl font-bold'>7h 17m</p>
	// 		</CardContent>
	// 	</Card>
	// );
}
