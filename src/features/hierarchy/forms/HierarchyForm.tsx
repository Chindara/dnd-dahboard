import 'reactflow/dist/style.css';
import OrgChart from '../components/OrgChart';

const backendData = [
	{ id: '1', name: 'Bahee', designation: 'Director/General Manager', department: 'Administration', image: 'https://i.pravatar.cc/100?img=1', managerId: null },
	{ id: '2', name: 'Manju', designation: 'General Manager', department: 'Business Unit 1', image: 'https://i.pravatar.cc/100?img=2', managerId: '1' },
	{ id: '3', name: 'Suraweera', designation: 'Ass. General Manager', department: 'Business Unit 1', image: 'https://i.pravatar.cc/100?img=3', managerId: '2' },
	{ id: '4', name: 'Sidesh', designation: 'Department Manager', department: 'Product Engineering 4', image: 'https://i.pravatar.cc/100?img=4', managerId: '3' },
	{ id: '5', name: 'Devinda', designation: 'Team Leader', department: 'Product Engineering 4', image: 'https://i.pravatar.cc/100?img=5', managerId: '4' },
	{ id: '6', name: 'Yohan', designation: 'Support Engineer', department: 'Product Engineering 4', image: 'https://i.pravatar.cc/100?img=6', managerId: '4' },
	{ id: '7', name: 'Samitha', designation: 'Support Engineer', department: 'Product Engineering 4', image: 'https://i.pravatar.cc/100?img=7', managerId: '4' },
	{ id: '8', name: 'Mevan', designation: 'Support Engineer', department: 'Product Engineering 4', image: 'https://i.pravatar.cc/100?img=8', managerId: '4' },
	{ id: '9', name: 'Vijayan', designation: 'General Manager', department: 'Business Unit 2', image: 'https://i.pravatar.cc/100?img=9', managerId: '1' },
	{ id: '10', name: 'Amal', designation: 'Ass. General Manager', department: 'Business Unit 1', image: 'https://i.pravatar.cc/100?img=10', managerId: '9' },
	{ id: '11', name: 'Chaminda', designation: 'Department Manager', department: 'Product Engineering 4', image: 'https://i.pravatar.cc/100?img=11', managerId: '10' },
	{ id: '12', name: 'Achintha', designation: 'Support Engineer', department: 'Product Engineering 5', image: 'https://i.pravatar.cc/100?img=12', managerId: '11' },
	{ id: '13', name: 'Lasintha', designation: 'Support Engineer', department: 'Product Engineering 5', image: 'https://i.pravatar.cc/100?img=13', managerId: '11' },
	{ id: '14', name: 'Dilusha', designation: 'Business Analyst', department: 'Product Engineering 5', image: 'https://i.pravatar.cc/100?img=14', managerId: '11' },
	{ id: '15', name: 'Susith', designation: 'Department Manager', department: 'Product Engineering 1', image: 'https://i.pravatar.cc/100?img=15', managerId: '10' },
	{ id: '16', name: 'Laksheya', designation: 'Business Analyst', department: 'Product Engineering 5', image: 'https://i.pravatar.cc/100?img=16', managerId: '9' },
	{ id: '17', name: 'Lalindi', designation: 'Business Analyst', department: 'Product Engineering 5', image: 'https://i.pravatar.cc/100?img=17', managerId: '9' },
	{ id: '18', name: 'Nathasha', designation: 'Business Analyst', department: 'Product Engineering 5', image: 'https://i.pravatar.cc/100?img=18', managerId: '9' },
	{ id: '19', name: 'Chinthaka', designation: 'Department Manager', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=19', managerId: '1' },
	{ id: '20', name: 'Kasun', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=20', managerId: '19' },
	{ id: '21', name: 'Prabod', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=21', managerId: '19' },
	{ id: '22', name: 'Disni', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=22', managerId: '19' },
	{ id: '23', name: 'Shaahid', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=23', managerId: '19' },
	{ id: '24', name: 'Dulangi', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=24', managerId: '19' },
	{ id: '25', name: 'Sachini', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=25', managerId: '19' },
	{ id: '26', name: 'Isuru', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=26', managerId: '19' },
	{ id: '27', name: 'Praveen', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=27', managerId: '19' },
	{ id: '28', name: 'Ovini', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=28', managerId: '19' },
	{ id: '29', name: 'Bilani', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=29', managerId: '19' },
	{ id: '30', name: 'Sandesh', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=30', managerId: '19' },
	{ id: '31', name: 'Sasindu', designation: 'Software Engineer', department: 'Software Development B', image: 'https://i.pravatar.cc/100?img=31', managerId: '19' },
	{ id: '32', name: 'Rasika', designation: 'Department Manager', department: 'Software Development A', image: 'https://i.pravatar.cc/100?img=32', managerId: '1' },
	{ id: '33', name: 'Pehan', designation: 'Software Engineer', department: 'Software Development A', image: 'https://i.pravatar.cc/100?img=33', managerId: '32' },
	{ id: '34', name: 'Lasath', designation: 'Software Engineer', department: 'Software Development A', image: 'https://i.pravatar.cc/100?img=34', managerId: '32' },
	{ id: '35', name: 'Dulangi', designation: 'Quality Engineer', department: 'Software Development A', image: 'https://i.pravatar.cc/100?img=35', managerId: '32' },
	{ id: '36', name: 'Malindu', designation: 'Quality Engineer', department: 'Software Development A', image: 'https://i.pravatar.cc/100?img=36', managerId: '32' },
	{ id: '37', name: 'Janika', designation: 'Quality Engineer', department: 'Software Development A', image: 'https://i.pravatar.cc/100?img=37', managerId: '32' },
	{ id: '38', name: 'Tharindu', designation: 'Quality Engineer', department: 'Software Development A', image: 'https://i.pravatar.cc/100?img=38', managerId: '32' },
	{ id: '39', name: 'Dulan', designation: 'Team Leader', department: 'Data Center 1', image: 'https://i.pravatar.cc/100?img=39', managerId: '3' },
];

function HierarchyForm() {
	return <OrgChart employees={backendData} orientation='vertical' />;
}

export default HierarchyForm;
