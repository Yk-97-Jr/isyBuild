import React from 'react'

import type { ReactElement } from 'react'

import MainEdit2 from './MainEdit2'

import Main from './AppeleOffre/Main'

import Tabilation from './Tabilation'


const tabContentList: { [key: string]: ReactElement } = {
  'Informations Generales': <MainEdit2 />,
  'Appelle Offre': <Main />
}


function Tabs() {

  return (
    <div>
      <Tabilation tabContentList={tabContentList} />
    </div>
  )
}

export default Tabs
