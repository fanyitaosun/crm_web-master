const getLocationOrigin = () => {
  return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
}

const companyName = '易优CRM'
const version = 'V11.1.1'
const baiduKey = 'hXeY7xjOfDfWurcauKG9IZgZhzHsUA56'

export default {
  version,
  companyName,
  getLocationOrigin,
  baiduKey
}
