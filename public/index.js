var articleCont = document.getElementById('article');
var productCont = document.getElementById('product');

var articleNewBtn = document.createElement('button');
articleCont.appendChild(articleNewBtn);
articleNewBtn.addEventListener('click', function(event){
  console.log('hello');
})