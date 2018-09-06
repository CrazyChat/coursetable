let storage = window.localStorage;
class memberValue {
  constructor(id, weekdayCounts, sectionCounts, member_star, member_end, member_else, member, userCourses) {
    this.id = id;
    this.weekdayCounts = weekdayCounts;
    this.sectionCounts = sectionCounts;
    this.member_star = member_star;
    this.member_end = member_end;
    this.member_else = member_else;
    this.member = member;
    this.userCourses = userCourses;
  }
}

function isNumber(value) {
　let re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
  if (re.test(value)) {
    return true;
  } else {
    return false;
  }
}

// 导入数据函数
function importV(memberNumber) {
  weekdayCounts = memberNumber.weekdayCounts;
  sectionCounts = memberNumber.sectionCounts;
  member_star = memberNumber.member_star;
  member_end = memberNumber.member_end;
  member_else = memberNumber.member_else;
  member = memberNumber.member;
  userCourses = memberNumber.userCourses;
  // 名字输入框显示“姓名”
  Input_Name.value = "姓名";
  // 向导航栏导入名字并赋予点击响应
  let oUl = document.getElementById("members");
  for (let i = 0, l = member.length; i < l; i++) {
    let oLi = document.createElement('li');
    oLi.innerHTML = member[i];
    oLi.className = "member";
    oUl.appendChild(oLi);
    If_First.push(1);
  }
  clickNav();
}

// 保存数据到localStorage
function saveStorage() {
  if (member.length > 0) {
    let valueNumber = window.prompt("输入保存的数据编号(数字),以后导入数据需要该编号:","");
    if (valueNumber){
      if (isNumber(valueNumber)) {
        valueNumber = Number(valueNumber);
        // localStorage是否存在allVersion
        if (!storage.getItem("allVersion")) {
          let allVersion = [];
          let temp = JSON.stringify(allVersion);
          storage.setItem("allVersion", temp);
        }
        // 添加编号进入allVersion
        let temp = storage.getItem("allVersion");
        let allVersion = JSON.parse(temp);
        // 判断编号是否已被占用
        if (allVersion.indexOf(valueNumber) === -1){
          // 提交前一个成员的数据并保存数据
          if (If_First[CurrentMember] === 1) {
              changeValue();
          } else {
              getValue();
              If_First[CurrentMember] = 1;    // 数据写入到userCourses里了
          }
          // 保存allVersion到localStorage
          allVersion.push(valueNumber);
          temp = JSON.stringify(allVersion);
          storage.setItem("allVersion", temp);
          // 创建对象
          let memberObject = new memberValue(valueNumber, weekdayCounts, sectionCounts, member_star, member_end, member_else, member, userCourses);
          // 保存对象到localStorage
          let order = allVersion.indexOf(valueNumber);
          let memberNumber = "member" + order;
          temp = JSON.stringify(memberObject);
          storage.setItem(memberNumber, temp);
          // 提示
          setTimeout(function() {
            alert("数据已经保存!");
          }, 200);
        } else {
          if(confirm('此编号版本已经存在,继续保存将覆盖原来的数据,是否继续？')) {
            // 提交前一个成员的数据并保存数据
            if (If_First[CurrentMember] === 1) {
              changeValue();
            } else {
              getValue();
              If_First[CurrentMember] = 1;    // 数据写入到userCourses里了
            }
            // 创建对象
            let memberObject = new memberValue(valueNumber, weekdayCounts, sectionCounts, member_star, member_end, member_else, member, userCourses);
            let order = allVersion.indexOf(valueNumber);
            let memberNumber = "member" + order;
            storage.removeItem(memberNumber);
            temp = JSON.stringify(memberObject);
            storage.setItem(memberNumber, temp);
            // 提示
            setTimeout(function() {
              alert("数据已经保存!");
            }, 200);
          }
        }
      } else {
        alert('请输入纯数字!');
      }
    }
  } else {
    alert('当前没有数据')
  }
}

// 导入Storage数据
function importStorage() {
  // 判断是否为启动页面
  if (If_StarPage){
    let temp = storage.getItem("allVersion");
    let allVersion = JSON.parse(temp);
    let searchVersion = window.prompt("输入编号(数字)导入:","");
    if (searchVersion) {
      searchVersion = Number(searchVersion);
      if (allVersion && allVersion.indexOf(searchVersion) !== -1) {
        order = allVersion.indexOf(searchVersion);
        memberNumber = "member" +  order;
        temp = storage.getItem(memberNumber);
        memberNumber = JSON.parse(temp);
        if (weekdayCounts === memberNumber.weekdayCounts && sectionCounts === memberNumber.sectionCounts) {
          importV(memberNumber);
          // 提示导入成功
          setTimeout(function() {
            alert("导入成功");
          }, 200);
          If_StarPage = false;
        } else {
          alert("保存的数据星期数或节数与当前不同");
        }
      } else {
        alert('数据库中没有该版本号...');
      }
    }
  } else {
    alert("当前页面已有数据，请在启动页面导入数据");
  }
}