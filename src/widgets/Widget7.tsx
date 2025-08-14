import { PolarGrid, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WidgetCard } from './WidgetCard';

export const description = 'A radial chart with a grid';

const chartData = [
	{ section: 'profile', completion: 600, fill: 'var(--color-profile)' },
	{ section: 'cycle', completion: 185, fill: 'var(--color-cycle)' },
	{ section: 'address', completion: 359, fill: 'var(--color-address)' },
	{ section: 'family', completion: 100, fill: 'var(--color-family)' },
	{ section: 'qualification', completion: 397, fill: 'var(--color-qualification)' },
	{ section: 'experience', completion: 258, fill: 'var(--color-experience)' },
	{ section: 'language', completion: 600, fill: 'var(--color-language)' },
	{ section: 'skill', completion: 20, fill: 'var(--color-skill)' },
	{ section: 'travel', completion: 50, fill: 'var(--color-travel)' },
	{ section: 'extra', completion: 0, fill: 'var(--color-extra)' },
];

const chartConfig = {
	completion: {
		label: 'Completion',
	},
	profile: {
		label: 'Profile',
		color: 'var(--chart-1)',
	},
	cycle: {
		label: 'Cycle',
		color: 'var(--chart-2)',
	},
	address: {
		label: 'Address',
		color: 'var(--chart-3)',
	},
	family: {
		label: 'Family',
		color: 'var(--chart-4)',
	},
	qualification: {
		label: 'Qualification',
		color: 'var(--chart-5)',
	},
	experience: {
		label: 'Experience',
		color: 'var(--chart-1)',
	},
	language: {
		label: 'Language',
		color: 'var(--chart-2)',
	},
	skill: {
		label: 'Skill',
		color: 'var(--chart-3)',
	},
	travel: {
		label: 'Travel',
		color: 'var(--chart-4)',
	},
	extra: {
		label: 'Extra',
		color: 'var(--chart-5)',
	},
} satisfies ChartConfig;

export function Widget7() {
	return (
		<WidgetCard title='Radial Chart - Grid' count={chartData.reduce((acc, curr) => acc + curr.completion, 0)} unit='completion'>
			<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<RadialBarChart data={chartData} innerRadius={20}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent nameKey='section' />} />
						<PolarGrid gridType='circle' />
						<RadialBar dataKey='completion' />
					</RadialBarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</WidgetCard>
	);
}
