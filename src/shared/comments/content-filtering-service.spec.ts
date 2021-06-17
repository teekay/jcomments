import { ContentFilteringService } from './content-filtering-service'

describe('ContentFilteringService', () => {
  const cf = new ContentFilteringService()

  describe('Convert to Markdown', () => {

    it('Will let Markdown be Markdown', () => {
      const fromMd = `# Title

Paragraph 1

Paragraph 2

`
      const toMd = cf.toMarkdown(fromMd)
      const linesIn = fromMd.split("\n")
      const linesOut = toMd.split("\n")
      expect(linesOut.length).toEqual(linesIn.length)
      for (let i = 0; i < linesIn.length; i++) {
        expect(linesOut[i]).toEqual(linesIn[i])
      }
    })

    it('Will let HTML be Markdown', () => {
      const fromHtml = `<h1 class="super">Welcome!</h1>
<p>Lorem ipsum...</p>`
      const toMd = cf.toMarkdown(fromHtml)
      const linesOut = toMd.split("\n")
      expect(linesOut.length).toEqual(5)
      expect(linesOut[0]).toEqual('# Welcome!')
      expect(linesOut[1]).toEqual('')
      expect(linesOut[2]).toEqual('Lorem ipsum...')
    })
  })

  describe('Convert to HTML', () => {
    it('Will let Markdown be HTML', () => {
      const fromMd = `# Title

Paragraph 1
      
Paragraph 2
      
      `
      const toHtml = cf.toHtml(fromMd)
      const linesOut = toHtml.split("\n")
      expect(linesOut[0]).toEqual('<h1>Title</h1>')
      expect(linesOut[1]).toEqual('<p>Paragraph 1</p>')
      expect(linesOut[2]).toEqual('<p>Paragraph 2</p>')
    })

    it('Will strip out script tags (markdown)', () => {
      const fromHtml = 'Hello <script>alert("xss!");</script>'
      const toMd = cf.toMarkdown(fromHtml)
      expect(toMd.split("\n")[0]).toEqual('Hello')
    })

    it('Will strip out script tags (html)', () => {
      const fromHtml = 'Hello <script>alert("xss!");</script>'
      const toHtml = cf.toHtml(fromHtml)
      expect(toHtml).toEqual('<p>Hello </p>')
    })

    it('Will strip out HREF tags (markdown)', () => {
      const fromHtml = '[Hello](alert("XSS");)'
      const toMd = cf.toMarkdown(fromHtml)
      expect(toMd.split("\n")[0]).toEqual('[Hello](<>)')
    })

    it('Will strip out HREF tags (html)', () => {
      const fromHtml = '<a href="alert(0);">Hello</a>'
      const toHtml = cf.toHtml(fromHtml)
      expect(toHtml).toEqual('<p><a href>Hello</a></p>')
    })
    
    it('Will strip out HREF tags with event handler (html)', () => {
      const fromHtml = '<a href="#" onclick="alert(0);">Hello</a>'
      const toHtml = cf.toHtml(fromHtml)
      expect(toHtml).toEqual('<p><a href="#">Hello</a></p>')
    })

    it('Will strip out styles', () => {
      const fromHtml='<p style="font-size: 60em">Hello</p>'
      const toHtml = cf.toHtml(fromHtml)
      expect(toHtml).toEqual('<p>Hello</p>')
    })

  })

  describe("Convert to text", () => {
    it('Strips Markdown input to TXT', () => {
      const fromMd = '# Hello'
      const toText = cf.toPlainText(fromMd)
      expect(toText).toEqual('Hello')
    })
    
    it('Strips HTML input to TXT', () => {
      const fromMd = '<h1><b>Hel<em>lo</em></b></h1><script>document.write("Loser!");</script>'
      const toText = cf.toPlainText(fromMd)
      expect(toText.split("\n").join('')).toEqual('Hello')
    })
  })

})