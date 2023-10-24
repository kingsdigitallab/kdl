var body = document.getElementsByTagName('body')[0]

body.onload = function() {
  addCSS()

  addStatic()
}

function addCSS() {
  let link = document.createElement('link')
  link.href = getBasePath() + '/../css/screen.css'
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.media = 'screen, projection'

  document.getElementsByTagName('head')[0].appendChild(link)
}

function getBasePath() {
  const jsFile = getJSFile().src.split('?')[0]
  return jsFile.substr(0, jsFile.lastIndexOf('/'))
}

function getJSFile() {
  const scripts = document.getElementsByTagName('script')

  return scripts[scripts.length - 1]
}

function addStatic() {
  const kdlUrl = 'https://www.kdl.kcl.ac.uk/'

  let div = document.createElement('div')
  div.className = 'sla'

  let p = document.createElement('p')
  p.innerHTML = 'This static site is hosted by '

  let a = document.createElement('a')
  a.href = kdlUrl
  a.innerHTML = "King's Digital Lab"

  p.appendChild(a)
  p.appendChild(
    document.createTextNode(
      ' to offer public access to a legacy project. It has reduced functionality to improve '
    )
  )

  a = document.createElement('a')
  a.href = kdlUrl + 'our-work/archiving-sustainability/'
  a.innerHTML = 'sustainability'

  p.appendChild(a)

  div.appendChild(p)

  body.appendChild(div)
}
