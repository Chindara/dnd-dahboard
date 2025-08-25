import { Card, CardContent } from '@/components/ui/card';
import { Employee } from '@/types/DashboardWidget';

type OrgCardProps = {
	data: Employee;
};

export default function OrgCard({ data }: OrgCardProps) {
	return (
		<Card className='shadow-lg rounded-lg border border-gray-200'>
			<CardContent className='flex items-center p-2'>
				<div className='grid grid-cols-4 gap-2'>
					<div className='col-span-1'>
						<img src={data.image} alt={data.name} className='size-14 rounded-full' />
					</div>
					<div className='flex-col col-span-3'>
						<p className='text-md font-semibold text-gray-900'>{data.name}</p>
						<p className='text-xs text-gray-600'>{data.designation}</p>
						<p className='text-xs text-gray-500'>{data.department}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
