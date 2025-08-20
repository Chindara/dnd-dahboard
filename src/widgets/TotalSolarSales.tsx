import { StatCard } from '@/components/StatCard';
import { Wallet } from 'lucide-react';

export function TotalSolarSales() {
	return <StatCard title='Total Solar Sales' value='45,823' change={{ percentage: 10, absolute: 213 }} icon={Wallet} iconColor='blue' />;
}
