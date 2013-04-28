var proxy = new Proxy('localhost', 3000);
var data = {
  account:{
    name:'killerg'
  }
  ,player:{
    sex:'ÄÐ'
    ,nick_name:'killerg'
    ,company:'wt'
    ,email:'killgxlin@hotmail.com'
    ,attribute:{
      jingli:10
      ,meili:10
      ,dengji:10
      ,daibi:10
    }
    ,cards:[
      { rongmao:10
        ,shencai:10
	,shengxian:10
	,jingshen:10
	,jingyan:10
	,dengji:10
	,peiyang_shengyu:10
	,peiyang_leixing:10
      }
    ]
    ,events:[
    ]
  }
};

var level = {
  
};

function onCombatCommit(res) {
  if(res.err) {
    console.log(res.err);
  } else {
    proxy.selectCard({}, onSelectCard);
  }
}

function onQueryLevel(res) {
  if(res.err) {
    console.log(res.err);
  } else {
    proxy.combatCommit({}, onCombatCommit);
  }
}

function onSelectCard(res) {
  if(res.err) {
    console.log(res.err);
  } else {
    proxy.queryLevel({}, onQueryLevel);
  }
}

function onLoadPlayer(res) {
  if(res.err) {
    console.log(res.err);
    proxy.createPlayer({name:'lala'}, onCreatePlayer);
  } else {
    proxy.selectCard({index:0}, onSelectCard);
  }
}

function onCreatePlayer(res) {
  if(res.err)
    console.log(res.err);
  else
    proxy.loadPlayer({}, onLoadPlayer);
}

function onLogin(res) {
  if(res.err) {
    console.log(res.err);
    proxy.register({user:'killerg', passwd:'killerg'}, onRegister);
  } else {
    proxy.loadPlayer({}, onLoadPlayer);
    data.account.name = res.account_name;
  }
}

function onRegister(res) {
  if(res.err)
    console.log(res.err);
  else
    proxy.login({user:'killerg'}, onLogin);
}

proxy.login({user:'killerg'}, onLogin);
