import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<FormControl component="fieldset" sx={{ mt: 1 }}>
			<FormLabel component="legend">Gender</FormLabel>
			<RadioGroup
				row
				aria-label="gender"
				name="gender"
				value={selectedGender}
				onChange={(e) => onCheckboxChange(e.target.value)}
			>
				<FormControlLabel value="male" control={<Radio />} label="Male" />
				<FormControlLabel value="female" control={<Radio />} label="Female" />
			</RadioGroup>
		</FormControl>
	);
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;
