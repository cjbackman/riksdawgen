import S from './images/S.jpg'
import M from './images/M.jpg'
import SD from './images/SD.jpg'
import L from './images/L.jpg'
import MP from './images/MP.jpg'
import KD from './images/KD.jpg'
import V from './images/V.jpg'
import C from './images/C.jpg'

export const parties = [
  {
    value: 'S',
    label: 'Socialdemokraterna',
    color: '#D64541',
    sortOrder: 1,
    logo: S
  }, // #EE2020
  {
    value: 'M',
    label: 'Moderaterna',
    color: '#59ABE3',
    sortOrder: 2,
    logo: M
  }, // #1B49DD
  {
    value: 'SD',
    label: 'Sverigedemokraterna',
    color: '#F5D76E',
    sortOrder: 3,
    logo: SD
  }, // #DDDD00
  {
    value: 'MP',
    label: 'Miljöpartiet',
    color: '#26A65B',
    sortOrder: 4,
    logo: MP
  }, // #83CF39
  {
    value: 'C',
    label: 'Centerpartiet',
    color: '#1E824C',
    sortOrder: 5,
    logo: C
  }, // #009933
  {
    value: 'V',
    label: 'Vänsterpartiet',
    color: '#96281B',
    sortOrder: 6,
    logo: V
  }, // #AF0000
  { value: 'L', label: 'Liberalerna', color: '#89C4F4', sortOrder: 7, logo: L }, // #6BB7EC
  {
    value: 'KD',
    label: 'Kristdemokraterna',
    color: '#1F3A93',
    sortOrder: 8,
    logo: KD
  } // #231977
]

export const getPartyProp = (val, prop) => {
  let party = parties.find(p => p.value === val)
  return party ? party[prop] : ''
}

/*
** Färger enligt logotyper
S_ed1b34
C_016a3a
L_006ab3
M_52bdec
MP_53a045
S_ed1b34
SD_fbc700
V_da291c
KD_005ea1
*/
