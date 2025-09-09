import { Handle, Position } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Employee } from '@/types/DashboardWidget';

type OrgCardProps = {
	data: Employee;
};

export default function OrgCard({ data }: OrgCardProps) {
	// Adjust handle styles based on orientation
	const getTargetHandleStyle = () => {
		return {
			background: '#64748b',
			width: 10,
			height: 10,
			border: '2px solid #fff',
			top: -5,
		};
	};

	const getSourceHandleStyle = () => {
		return {
			background: '#64748b',
			width: 10,
			height: 10,
			border: '2px solid #fff',
			bottom: -5,
		};
	};

	return (
		<div className='relative'>
			{/* Input Handle - Only show if employee has a manager */}
			{data.managerId && <Handle type='target' position={Position.Top} id='target' style={getTargetHandleStyle()} />}

			<Card className='shadow-lg rounded-lg border border-gray-200'>
				<CardContent className='flex items-center p-2'>
					<div className='grid grid-cols-4 gap-2 items-center'>
						<div className='col-span-1'>
							<img src={data.image} alt={data.name} className='size-13 rounded-full' />
						</div>
						<div className='flex-col col-span-3'>
							<p className='text-md font-semibold text-gray-900 truncate'>{data.name}</p>
							<p className='text-xs text-gray-600 truncate'>{data.designation}</p>
							{/* <p className='text-xs text-gray-500 truncate'>{data.department}</p> */}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Output Handle - Always show for potential subordinates */}
			<Handle type='source' position={Position.Bottom} id='source' style={getSourceHandleStyle()} />
		</div>
	);
}
