Date.prototype.Format = function (fmt) {
    var o = {
        "Y+": this.getFullYear(),
        "M+": '0' + (this.getMonth() + 1), //月份 
        "D+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "Q+": Math.floor((this.getMonth() + 3) / 3) //季度 
    };

    for (var key in o) {
        fmt = fmt.replace(new RegExp('(' + key + ')'), (match) => {
            return (o[key] + '').slice(-match.length)
        })
    }

    return fmt;
}

console.log(new Date().Format('YYYY-MM-DD hh:mm:ss'))