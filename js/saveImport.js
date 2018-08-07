let IfImport = false;
// 保存数据到localStorage
function saveStorage() {
  // 提交前一个成员的数据并保存数据
  if (IF_FIRST[CURRENTMEMBER] === 1) {
      changeValue();
  } else {
      getValue();
      IF_FIRST[CURRENTMEMBER] = 1;    // 数据写入到userCourses里了
  }
  // 开始保存数据
  let storage = window.localStorage;
  storage.clear();

  let temp = JSON.stringify(member_star);
  storage.setItem("smember_star", temp);

  temp = JSON.stringify(member_end);
  storage.setItem("smember_end", temp);
  
  temp = JSON.stringify(member_else);
  storage.setItem("smember_else", temp);

  temp = JSON.stringify(member);
  storage.setItem("smember", temp);

  temp = JSON.stringify(userCourses);
  storage.setItem("suserCourses", temp);

  // 提示
  setTimeout(function() {
    alert("数据已经保存到当前浏览器!");
  }, 200);
}

// 导入Storage数据
function importStorage() {
  // 判断是否为启动页面
  if (IF_INTRODUCE){
    // 获取保存的数据
    let storage = window.localStorage;
  
    let temp = storage.getItem("smember_star");
    member_star = JSON.parse(temp);

    temp = storage.getItem("smember_end");
    member_end = JSON.parse(temp);

    temp = storage.getItem("smember_else");
    member_else = JSON.parse(temp);

    temp = storage.getItem("smember");
    member = JSON.parse(temp);

    temp = storage.getItem("suserCourses");
    userCourses = JSON.parse(temp);
    
    // 名字输入框显示“姓名”
    INPUT_NAME.value = "姓名";
    // 向导航栏导入名字并赋予点击响应
    let oUl = document.getElementById("members");
    for (let i = 0, l = member.length; i < l; i++) {
      let oLi = document.createElement('li');
      oLi.innerHTML = member[i];
      oLi.className = "member";
      oUl.appendChild(oLi);
      IF_FIRST.push(1);
    }
    clickNav();
    // 提示导入成功
    setTimeout(function() {
      alert("导入成功");
    }, 200);
    IfImport = true;
    IF_INTRODUCE = false;
  } else {
    alert("当前页面已有数据，请刷新页面再导入数据");
  }
}