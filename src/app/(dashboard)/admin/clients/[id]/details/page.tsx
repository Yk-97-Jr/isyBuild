// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import ClientDetails from '@views/apps/admin/clients/details/ClientDetails'

const InfosClient = dynamic(() => import('@views/apps/admin/clients/details/info'))

const EntrepriseClient = dynamic(() => import('@views/apps/admin/clients/details/entreprise'))

const LotsClient = dynamic(() => import('@views/apps/admin/clients/details/lots'))

const ProjectsClient = dynamic(() => import('@views/apps/admin/clients/details/projects'))

const UsersClient = dynamic(() => import('@views/apps/admin/clients/details/users'))

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  infoclient: <InfosClient />,
  entrepriseclient: <EntrepriseClient />,
  lotsclient: <LotsClient />,
  projectsclient: <ProjectsClient />,
  usersclient: <UsersClient />
})

const ClientPage = () => {
  return <ClientDetails tabContentList={tabContentList()} />
}

export default ClientPage
