// type CompanyFormFields = {
// 	name: string;
// 	address: string;
// 	date: Date;
// 	active: boolean;
// };

const CompanyForm = () => {
	return (
		<form>
			<input type='text' placeholder='Name' />
			<input type='text' placeholder='Address' />
			<input type='date' placeholder='Date' />
			<input type='radio' placeholder='Active' />
		</form>
	);
};

export default CompanyForm;
