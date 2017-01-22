document.getElementById('files').addEventListener('change', function(e) {
    var file = this.files[0];

    var xhr = new XMLHttpRequest();
    (xhr.upload || xhr).addEventListener('progress', function(e) {
        var done = e.position || e.loaded
        var total = e.totalSize || e.total;
        console.log('xhr progress: ' + Math.round(done/total*100) + '%');
    });
    xhr.addEventListener('load', function(e) {
        console.log('xhr upload complete', e, this.responseText);
    });
    xhr.open('post', '/echo/json/', true);
	
    var data = new FormData;
    data.append('file', file);
    data.append('json', '{"foo":"bar"}'); // for jsFiddle
    xhr.send(data);
});
