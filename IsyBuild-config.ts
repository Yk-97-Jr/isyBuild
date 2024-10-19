import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './IsyBuild API.yaml',
  apiFile: './src/apiClients/IsyBuildClient.ts',
  apiImport: 'IsyBuildClient',
  outputFile: './src/services/IsyBuildApi.ts',
  exportName: 'pIsyBuildApi',
  hooks: true,
}

export default config
