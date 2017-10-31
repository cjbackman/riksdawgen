export const parties = [
  { value: 'S', label: 'Socialdemokraterna', color: '#EE2020', sortOrder: 1 },
  { value: 'M', label: 'Moderaterna', color: '#1B49DD', sortOrder: 2 },
  { value: 'SD', label: 'Sverigedemokraterna', color: '#DDDD00', sortOrder: 3 },
  { value: 'MP', label: 'Miljöpartiet', color: '#83CF39', sortOrder: 4 },
  { value: 'C', label: 'Centerpartiet', color: '#009933', sortOrder: 5 },
  { value: 'V', label: 'Vänsterpartiet', color: '#AF0000', sortOrder: 6 },
  { value: 'L', label: 'Liberalerna', color: '#6BB7EC', sortOrder: 7 },
  { value: 'KD', label: 'Kristdemokraterna', color: '#231977', sortOrder: 8 }
]

export const getPartyProp = (val, prop) => {
  let party = parties.find(p => p.value === val)
  return party ? party[prop] : ''
}
