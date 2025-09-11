import { Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WidgetCard } from './WidgetCard';
import { useMemo } from 'react';
import { CustomChartLegend } from '@/components/CustomChartLegend';
import { CheckCircle } from 'lucide-react';

const chartData = [
	{ browser: 'ontime', visitors: 1031, fill: 'var(--chart-2)', label: 'On-Time' },
	{ browser: 'wfh', visitors: 191, fill: 'var(--chart-3)', label: 'WFH' },
	{ browser: 'late', visitors: 212, fill: 'var(--chart-1)', label: 'Late' },
	{ browser: 'absent', visitors: 66, fill: 'var(--chart-5)', label: 'Absent' },
];

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	ontime: {
		label: 'On Time',
		color: 'var(--chart-2)',
	},
	wfh: {
		label: 'Work From Home',
		color: 'var(--chart-3)',
	},
	late: {
		label: 'Late',
		color: 'var(--chart-1)',
	},
	absent: {
		label: 'Absent',
		color: 'var(--chart-5)',
	},
} satisfies ChartConfig;

export function MyAttendance() {
	const totalVisitors = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	return (
		<WidgetCard
			title='My Attendance'
			footer={
				<>
					<CheckCircle className='h-4 w-4 text-green-700' />
					<span className='text-sm text-foreground'>Better than 91.3% employees!</span>
				</>
			}
		>
			<div className='flex h-full gap-2'>
				<div className='flex pr-2'>
					<CustomChartLegend items={chartData.map((d) => ({ label: d.label, value: d.visitors, color: d.fill }))} width={32} />
				</div>
				<div className='flex'>
					<ChartContainer config={chartConfig} className='aspect-square w-full [&_.recharts-responsive-container]:!h-full'>
						<ResponsiveContainer width='100%' height='100%'>
							<PieChart margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
								<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
								<Pie data={chartData} dataKey='visitors' nameKey='browser' innerRadius='60%' outerRadius='90%' cx='50%' cy='50%' strokeWidth={8}>
									<Label
										content={({ viewBox }) => {
											if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
												return (
													<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
														<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
															{totalVisitors.toLocaleString()}
														</tspan>
														<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
															Days
														</tspan>
													</text>
												);
											}
										}}
									/>
								</Pie>
								<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							</PieChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>
			</div>
		</WidgetCard>
	);
}
