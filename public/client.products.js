var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function(event){
  event.preventDefault();

  var inputs = this.parentNode.querySelectorAll('input[name]');
  var xhrUrl = document.getElementById('xhrUrl').value;
  var method = document.getElementById('method').value;
  var payload = 'id=' + inputs[0].value + "&name=" + inputs[1].value + "&price=" + inputs[2].value + "&inventory=" + inputs[3].value;
  var headerReq = new XMLHttpRequest();
  headerReq.addEventListener('load', createRequest);
  headerReq.open(method, xhrUrl);
  headerReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  headerReq.setRequestHeader("Version", "1.0")
  headerReq.send(payload);
});

function createRequest(){
  console.log(this.responseText);
};