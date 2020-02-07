const req = function(method, url, content, cb) {
  const request = new XMLHttpRequest();
  request.onload = function() {
    cb(this.responseText);
  };
  request.open(method, url);
  request.send(content);
};

document.onload = loadApp();
