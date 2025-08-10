import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { WidgetCard } from './WidgetCard';

export const description = 'A radial chart with stacked sections';

const chartData = [{ browser: 'safari', visitors: 1260, fill: 'var(--color-safari)' }];

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	safari: {
		label: 'Safari',
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig;

export function Widget8() {
	return (
		<WidgetCard title='Radial Chart - Stacked'>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadialBarChart data={chartData} endAngle={100} innerRadius={80} outerRadius={140}>
						<PolarGrid gridType='circle' radialLines={false} stroke='none' className='first:fill-muted last:fill-background' polarRadius={[86, 74]} />
						<RadialBar dataKey='visitors' background />
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
												<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-4xl font-bold'>
													{chartData[0].visitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
													Visitors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
