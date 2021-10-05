const normalizeString = (s) => {    
    let s1 = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    let s2 = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < s1.length; i++) {
        s = s.replace( new RegExp(s1.charAt(i), 'g') , s2.charAt(i) );
    }
    return s.toLowerCase().trim().split(" ").join('');    
}


module.exports = {
    normalizeString
}
