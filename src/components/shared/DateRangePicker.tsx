import { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Card } from '../ui/card';
type DateRangePickerProps = {
	onChange?: (from: Date | null, to: Date | null) => void;
};

const DateRangePicker = ({ onChange }: DateRangePickerProps) => {
	const [selected, setSelected] = useState<DateRange | undefined>();

	const handleSelect = (range: DateRange | undefined) => {
		setSelected(range);
		if (onChange) {
			onChange(range?.from || null, range?.to || null);
		}
	};

	const formattedRange = selected?.from && selected?.to ? `${format(selected.from, 'yyyy/ MM/ dd')} - ${format(selected.to, 'yyyy/ MM/ dd')}` : 'Select date range';
	return (
		<div className='flex relative'>
			<Card className='flex  '>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='ghost' className='w-full justify-start text-left'>
							{formattedRange}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='flex rounded-md border shadow-sm mr-4'>
						<div className='relative overflow-hidden'>
							<Calendar
								mode='range'
								selected={selected}
								onSelect={handleSelect}
								captionLayout='dropdown'
								className=' relative overflow-hidden'
							/>
						</div>
					</PopoverContent>
				</Popover>
			</Card>
		</div>
	);
};

export default DateRangePicker;
