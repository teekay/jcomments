export class SettingsParam {
  requireModeration = false
  useAkismet = false
  akismetKey = ''
  blogUrl = ''
  useLlmCheck = false
  llmApiKey = ''
  llmConfidenceThreshold = 0.8
}

export class EmailSettingsParam {
  notifyOnComments = false
  sendCommentsDigest = false
}
