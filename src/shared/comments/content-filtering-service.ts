import { Injectable } from '@nestjs/common'
import { JSDOM } from 'jsdom'
import { Converter, setFlavor } from 'showdown'
import xss from 'xss'

@Injectable()
export class ContentFilteringService {
  private dom: JSDOM
  private converter: Converter

  constructor() {
    const xssfilter = function () {
      const ext = {
        type: 'output',
        filter: function (text: string): string {
          return xss(text, {
            css: {
              whitelist: false,
            },
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script'],
          })
        },
      }
      return [ext]
    }

    setFlavor('github')
    this.dom = new JSDOM()
    this.converter = new Converter({
      noHeaderId: true,
      tables: true,
      simpleLineBreaks: true,
      openLinksInNewWindow: true,
      extensions: [xssfilter],
    })
  }

  public toMarkdown(maybeHtml: string): string {
    const html = this.converter.makeHtml(maybeHtml)
    return this.converter.makeMarkdown(html, this.dom.window.document)
  }

  public toHtml(maybeMarkdown: string): string {
    return this.converter.makeHtml(maybeMarkdown)
  }

  public toPlainText(whatever: string): string {
    const html = this.converter.makeHtml(whatever)
    return xss(html, {
      css: {
        whitelist: false,
      },
      whiteList: {}, // empty, means filter out all tags
      stripIgnoreTag: true, // filter out all HTML not in the whitelist
      stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
      // to filter out its content; same for styles but unfortunately this package
      // cannot do it :(
    })
  }
}
