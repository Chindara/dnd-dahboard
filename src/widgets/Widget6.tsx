import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WidgetCard } from './WidgetCard';

export const description = 'A radar chart with lines only';

const chartData = [
	{ month: 'January', desktop: 186, mobile: 160 },
	{ month: 'February', desktop: 185, mobile: 170 },
	{ month: 'March', desktop: 207, mobile: 180 },
	{ month: 'April', desktop: 173, mobile: 160 },
	{ month: 'May', desktop: 160, mobile: 190 },
	{ month: 'June', desktop: 174, mobile: 204 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)',
	},
} satisfies ChartConfig;

export function Widget6() {
	return (
		<WidgetCard title='Radar Chart - Lines Only'>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadarChart data={chartData}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
						<PolarAngleAxis dataKey='month' />
						<PolarGrid radialLines={false} />
						<Radar dataKey='desktop' fill='var(--color-desktop)' fillOpacity={0} stroke='var(--color-desktop)' strokeWidth={2} />
						<Radar dataKey='mobile' fill='var(--color-mobile)' fillOpacity={0} stroke='var(--color-mobile)' strokeWidth={2} />
					</RadarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
