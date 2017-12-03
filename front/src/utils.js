export const parties = [
  { value: 'S', label: 'Socialdemokraterna', color: '#D64541', sortOrder: 1 }, // #EE2020
  { value: 'M', label: 'Moderaterna', color: '#59ABE3', sortOrder: 2 }, // #1B49DD
  { value: 'SD', label: 'Sverigedemokraterna', color: '#F5D76E', sortOrder: 3 }, // #DDDD00
  { value: 'MP', label: 'Miljöpartiet', color: '#26A65B', sortOrder: 4 }, // #83CF39
  { value: 'C', label: 'Centerpartiet', color: '#1E824C', sortOrder: 5 }, // #009933
  { value: 'V', label: 'Vänsterpartiet', color: '#96281B', sortOrder: 6 }, // #AF0000
  { value: 'L', label: 'Liberalerna', color: '#89C4F4', sortOrder: 7 }, // #6BB7EC
  { value: 'KD', label: 'Kristdemokraterna', color: '#1F3A93', sortOrder: 8 } // #231977
]

export const getPartyProp = (val, prop) => {
  let party = parties.find(p => p.value === val)
  return party ? party[prop] : ''
}
