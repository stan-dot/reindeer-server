import React from "react";
import { useState } from "react";
// const [vaccination, setVaccinaton] = useState('COVID-UK');
// const [language, setLanguage] = useState('English');

// function MySelectField({ str, variant = TEXTFIELD_LABELS.OUTLINED, ...options }) {
//   const wordsArray = str.split("-");
//   const normalizedArray = wordsArray.map(word => {
//     return word[0].toUpperCase() + word.substring(1).toLowerCase();
//   })
//   const label = normalizedArray.join(" ");
//   return <TextField
//     id={str}
//     label={label}
//     variant={variant}
//     style={{ minHeight: '10vh', padding: '10px' }}
//     select
//   />
// }
// // TODO add more https://www.nhs.uk/conditions/travel-vaccinations/jabs/
// const vaccinations = [
//   {
//     value: 'COVID-EU',
//     label: 'COVID-EU',
//   },
//   {
//     value: 'COVID-UK',
//     label: 'COVID-UK'
//   },
//   {
//     value: 'tuberculosis',
//     lable: 'Tuberculosis'
//   }
// ]

const languages = [
  {
    value: 'english',
    label: 'English'
  },
  {
    value: 'spanish',
    label: 'Spanish'
  },
  {
    value: 'arabic',
    label: 'Arabic'
  }
]

// const handleLanguageChange = event => {
//   setLanguage(event.target.value);
// }
// const handleVaccineChange = event => {
//   setVaccinaton(event.target.value)
// }
// function render() {
//   return <MyTextField str="hotel-stars " />
// } <TextField
//           id="outlined-select-currency"
//           select
//           label="Vaccination"
//           value={vaccination}
//           onChange={handleVaccineChange}
//           helperText="Please select your vaccine"
//           style={{ minHeight: '10vh' }}
//         >
//           {vaccinations.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField><TextField
//           id="outlined-select-language"
//           select
//           label="Language"
//           value={language}
//           onChange={handleLanguageChange}
//           helperText="Choose language you'd like to practice on this trip"
//           style={{ minHeight: '10vh' }}
//         >
//           {languages.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>