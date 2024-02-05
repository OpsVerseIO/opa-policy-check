import * as core from '@actions/core'
const axios = require('axios')
import { OpaResponse } from './opa-response'

export async function run(): Promise<void> {
  try {
    const opaServerUrl = core.getInput('opaServerUrl')
    const opaServerAuthToken = core.getInput('opaServerAuthToken')
    const opaServerInput = core.getInput('opaServerInput')
    const opaServerPackageName = core.getInput('opaServerPackageName')

    const headers = {
      Authorization: `Bearer ${opaServerAuthToken}`,
      'Content-Type': 'application/json'
    }
    core.info(`----------- OPA Server Details ----------`)
    core.info(`URL: ${opaServerUrl}`)
    core.info(`Server package name: ${opaServerUrl}`)
    core.info(`Input to server: ${opaServerInput}`)
    core.info(`-----------------------------------------`)

    const response = await axios.post(
      `${opaServerUrl}/v1/data/${opaServerPackageName}`,
      { opaServerInput },
      { headers }
    )
    if (response.status === 200) {
      const opaResponseObj = response.data as OpaResponse
      // core.info(`Response from OPA Server: ${JSON.stringify(opaResponseObj)}`)
      console.log('Response from OPA Server: ', opaResponseObj)
      if (!opaResponseObj.result.allow) {
        core.setFailed(`Policy check failed`)
        return
      }
      core.info(`Policy check passed successfully`)
    } else {
      core.error(`Failed to trigger sync for application: ${opaServerUrl}`)
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
