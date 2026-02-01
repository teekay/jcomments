import Anthropic from '@anthropic-ai/sdk'
import { CommentBase } from './comment.interface'
import { Injectable } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { SettingsParam } from '../accounts/settings.param'

export interface LlmSpamResult {
  is_spam: boolean
  confidence: number
}

@Injectable()
export class LlmSpamService {
  constructor(private readonly logger: Logger) {}

  async checkComment(
    accountSettings: SettingsParam,
    comment: CommentBase
  ): Promise<LlmSpamResult | undefined> {
    const apiKey = accountSettings.llmApiKey
    if (!apiKey) return

    const client = new Anthropic({ apiKey })

    const prompt = `You are a spam detection system. Analyze the following comment and determine if it is spam.

Comment author: ${comment.author.name}
Comment author email: ${comment.author.email || 'not provided'}
Comment author website: ${comment.author.website || 'not provided'}
Comment text: ${comment.text}
Page URL: ${comment.postUrl}

Respond with ONLY a JSON object in this exact format (no markdown, no explanation):
{"is_spam": true or false, "confidence": 0.0 to 1.0}

Consider these spam indicators:
- Promotional content or advertisements
- Links to suspicious websites
- Generic or irrelevant content
- Excessive use of keywords
- Poor grammar typical of automated spam
- Mentions of money, gambling, adult content, or pharmaceuticals

Consider these legitimate comment indicators:
- Relevant to the page content
- Personal opinions or questions
- Natural language patterns
- Engagement with the topic`

    try {
      const response = await client.messages.create({
        model: 'claude-haiku-4-20250514',
        max_tokens: 100,
        messages: [{ role: 'user', content: prompt }],
      })

      const textContent = response.content.find((c) => c.type === 'text')
      if (!textContent || textContent.type !== 'text') {
        this.logger.warn('LLM spam check returned no text content')
        return
      }

      const result = JSON.parse(textContent.text) as LlmSpamResult
      if (typeof result.is_spam !== 'boolean' || typeof result.confidence !== 'number') {
        this.logger.warn(`LLM spam check returned invalid format: ${textContent.text}`)
        return
      }

      this.logger.debug(`LLM spam check result: ${JSON.stringify(result)}`)
      return result
    } catch (error) {
      this.logger.warn(`Could not reach LLM API: ${(error as Error)?.message}`)
      return
    }
  }
}
