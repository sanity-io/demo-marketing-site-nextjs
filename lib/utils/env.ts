/* eslint-disable no-process-env */

export const env = (key: string): string | undefined => {
  return process.env[key]
}
