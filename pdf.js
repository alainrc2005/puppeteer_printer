const puppeteer = require('puppeteer')

module.exports = {
  async generate(data) {
    /* params for root user */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    await page.setViewport({
      width: 220,
      height: 120,
      deviceScaleFactor: 1
    })
    await page.goto(`file://${data.path}/${data.uuid}.html`, {
      waitUntil: 'networkidle0'
    })
    const path = `${data.path}/${data.uuid}.pdf`
    await page.pdf({
      path,
      format: 'A4',
      landscape: !!data.landscape,
      margin: {
        top: '1.0cm',
        right: '1.0cm',
        bottom: '1.0cm',
        left: '1.0cm'
      }
    })
    await browser.close()
  }
}

