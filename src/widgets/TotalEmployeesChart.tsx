import * as React from 'react';
import { Label, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { WidgetCard } from './WidgetCard';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
	{ group: 'year2030', employees: 435, fill: 'var(--color-year2030)' },
	{ group: 'year3040', employees: 400, fill: 'var(--color-year3040)' },
	{ group: 'year4040', employees: 225, fill: 'var(--color-year4040)' },
	{ group: 'year50', employees: 100, fill: 'var(--color-year50)' },
];

const chartConfig = {
	employees: {
		label: 'Employees',
	},
	year2030: {
		label: '20-30 Years',
		color: 'var(--chart-1)',
	},
	year3040: {
		label: '30-40 Years',
		color: 'var(--chart-2)',
	},
	year4040: {
		label: '40-50 Years',
		color: 'var(--chart-3)',
	},
	year50: {
		label: '50+ Years',
		color: 'var(--chart-4)',
	},
} satisfies ChartConfig;

export function TotalEmployeesChart() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.employees, 0);
	}, []);

	return (
		<WidgetCard title='Total Employees'>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey='employees' nameKey='group' innerRadius='60%' outerRadius='90%' cx='50%' cy='50%' strokeWidth={8}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
												<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
													Employees
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
						{/* <ChartLegend content={<ChartLegendContent />} /> */}
					</PieChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
