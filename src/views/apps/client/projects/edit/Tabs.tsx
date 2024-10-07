import React from 'react'

import type { ReactElement } from 'react'

import MainEdit2 from './MainEdit2'

import AppeleOffre from './AppeleOffre'

import Tabilation from './Tabilation'


const tabContentList: { [key: string]: ReactElement } = {
  'Informations Generales': <MainEdit2 />,
  'Appelle Offre': <AppeleOffre />
}


function Tabs() {

  return (
    <div>
      <Tabilation tabContentList={tabContentList} />
    </div>
  )
}

export default Tabs
