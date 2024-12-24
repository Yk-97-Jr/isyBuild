import React from 'react'

import type { ReactElement } from 'react'

import MainEdit2 from './MainEdit2'


import Tabilation from './Tabilation'
import AppeleOffre from "@views/apps/admin/projects/edit/AppeleOffre/AppeleOffreList/AppeleOffre";
import DocDiffList from './documentDiffusions/list/DocDiffList';


const tabContentList: { [key: string]: ReactElement } = {
  'Informations Generales': <MainEdit2 />,
  'Appelle Offre': <AppeleOffre />,
  'Diffusions De Documents': <DocDiffList />,
  'Finance': <></>,
}


function Tabs() {

  return (
    <div>
      <Tabilation tabContentList={tabContentList} />
    </div>
  )
}

export default Tabs
