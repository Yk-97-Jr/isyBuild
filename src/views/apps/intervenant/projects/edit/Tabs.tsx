import React from 'react'

import type {ReactElement} from 'react'

import MainEdit2 from './MainEdit2'


import Tabilation from './Tabilation'

import DocDiffList from './documentDiffusions/list/DocDiffList';
import GestionAdministrativeList from './GestionAdministartive/GestionAdministrativeList/GestionAdministrativeList';

// import FinanceList from './Finance/list/FinanceList';


const tabContentList: { [key: string]: ReactElement } = {
  'Informations Generales': <MainEdit2/>,
  'Gestion Administartive': <GestionAdministrativeList/>,
  'Diffusions De Documents': <DocDiffList/>,

  // 'Diffusions De Documents': <DocDiffList />,

  // 'Finance': <FinanceList />,
}


function Tabs() {

  return (
    <div>
      <Tabilation tabContentList={tabContentList}/>
    </div>
  )
}

export default Tabs
