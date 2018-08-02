// 保存数据到localStorage
function saveStorage() {
    let storage = window.localStorage;
    storage.setItem("sWEEKS", WEEKS);
    storage.setItem("smember_star", member_star);
    storage.setItem("smember_end", member_end);
    storage.setItem("smember_else", member_end);
    storage.setItem("smember", member);
    alert("保存数据成功!");
  }
  
  // 导入Storage数据
  function importStorage() {
    // 获取保存的数据
    let storage = window.localStorage;
    WEEKS = storage.getItem("sWEEKS");
    member_star = storage.getItem("smember_star");
    member_else = storage.getItem("smember_else");
    member = storage.getItem("smember");
    // 名字输入框显示“姓名”
  
    // 向导航栏输入名字并赋予点击响应
  
    // 表格全部隐藏
  
    // 将数据全部写入userCourse
  }