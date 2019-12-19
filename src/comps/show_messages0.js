var items = [{
  'item':'glass',
  'disc':'anythimg',
  'id':'1'

},
{
  'item':'shose',
  'disc':'blaaah',
  'id':'2'

}
]



items.filter(x=>{
  (x.id == '2') ? console.log(items.indexOf(x)):null
})
