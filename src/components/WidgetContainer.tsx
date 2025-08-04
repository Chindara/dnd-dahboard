import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

type WidgetContainerProps = {
	title: string;
	description: string;
	children: React.ReactNode;
};

export function WidgetContainer({ title, description, children }: WidgetContainerProps) {
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-1 items-center min-w-1 min-h-1'>{children}</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 leading-none font-medium'>
					Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
				</div>
				<div className='text-muted-foreground leading-none'>Showing total visitors for the last 6 months</div>
			</CardFooter>
		</Card>
	);
}
