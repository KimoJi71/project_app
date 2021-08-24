//取得現在時間，格式為YYYY-MM-DD HH:MM:SS
function onTime()  {
    const date = new Date()
    const yy = date.getFullYear()
    const mm = date.getMonth() +1
    const dd = date.getDate()
    const hh = date.getHours()
    const mi = date.getMinutes()
    const ss = date.getSeconds()
  
    console.log([yy, '-' + 
            (mm > 9 ? '' : '0') + mm, '-' + 
            (dd > 9 ? '' : '0') + dd, ' ' +
            (hh > 9 ? '' : '0') + hh, ':' +
            (mi > 9 ? '' : '0') + mi, ':' +
            (ss > 9 ? '' : '0') + ss
          ].join(''))
}