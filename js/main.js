
let CURRENTMEMBER = 0;   // 计算当前是哪个成员
let IF_INTRODUCE = true;    // 判断当前是否为介绍页面
let INPUT_NAME = document.getElementsByClassName('left-name')[0];  // 名字输入框的姓名
const WEEKS = 16 // 表示学期的周数为16周，可以设置为让用户输入
let IF_FIRST = [];       // 判断成员数据是否已经提交到了userCourses
// 保存每个成员的数据
let member_star = [];
let member_end = [];
let member_else = [];

const COURSETABLES = [] // 16个周的课程表, COURSETABLES[0]表示第一周的课表
for (let i = 0; i < WEEKS; i++) {
    /**
     * push的是一个周课程表，假设叫做courseTable，三维数组，courseTable[i][j]是一个数组，存储着当前课程时间段内有课的人及其有课的周
     * i表示课时，取值范围为0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * j表示周几，取值范围为0~6表示：周一到周日，注意：0表示周一
     * 例子：courseTable[0][2] = [ { user: { id: 1, name: '陈铭涛' }, noneCourseWeeks: [1, 2, 3] } ] 表示陈铭涛在1~3周的周三的1-2节课有课
     */
    COURSETABLES.push([
      [ [], [], [], [], [], [], [] ],
      [ [], [], [], [], [], [], [] ],
      [ [], [], [], [], [], [], [] ],
      [ [], [], [], [], [], [], [] ],
      [ [], [], [], [], [], [], [] ],
      [ [], [], [], [], [], [], [] ]
    ])
}

// 创建个人课程表，二维数组[36][haveCourse]
const user = new Array();
// 创建成员
const member = [];

// 存储所有人的课程
const userCourses = [
    /**
     * courseId表示课时，0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * weekday表示周几，0~6表示周一到周日
     * noneCourseWeeks表示无课的周
     */
    // { user: member[0], courseId: 0, weekday: 0, noneCourseWeeks: [] },  陈铭涛在...周周一的1~2节无课
]

// 交换表格并清掉数据
function changeForm() {
    if ($('#form1').is('.form-current') == true) {
        // 清空表格数据
        for (let x = 0; x < 7; x++ ) {
            for (let j = 0; j < 6; j++) {
                let m = j + x * 6;
                document.getElementsByClassName('course-star')[m].value = '';
                document.getElementsByClassName('course-end')[m].value = '';
                document.getElementsByClassName('course-else')[m].value = '';
            }
        }
        $("#form1").attr("class", "form-content form-hide");
        $("#form2").attr("class", "form-content form-current");
    } else if ($('#form2').is('.form-current') == true) {
        $("#form2").attr("class", "form-content form-hide");
        $("#form1").attr("class", "form-content form-current");
        // 清空表格数据
        for (let x = 0; x < 7; x++ ) {
            for (let j = 0; j < 6; j++) {
                let m = j + x * 6 + 42;
                document.getElementsByClassName('course-star')[m].value = '';
                document.getElementsByClassName('course-end')[m].value = '';
                document.getElementsByClassName('course-else')[m].value = '';
            }
        }
    } else {
        $("#form1").attr("class", "form-content form-current");
    }
    return;
}

// 向userCourse写入数据函数
function addCourse( user, courseId, weekday, noneCourseWeeks) {
    userCourses.push({ user, courseId, weekday, noneCourseWeeks });
}

// 姓名输入框的修改
function changeName() {
    if (!IF_INTRODUCE) {
        document.getElementsByClassName('member')[CURRENTMEMBER].innerHTML = INPUT_NAME.value;
        member[CURRENTMEMBER] = INPUT_NAME.value;
    }
}

// 获取输入的课表并写入userCourse
function getValue() {
    let w = 1;
    if ($('#form1').is('.form-current') == true) {
        w = 0;
    }
    for (let x = 0; x < 7; x++ ) {
        for (let j = 0; j < 6; j++) {
            let m = j + x * 6 + w * 42;
            let temp = j + x * 6 + CURRENTMEMBER * 42;
            let course_star = document.getElementsByClassName('course-star')[m].value;    // 获取开始的周
            let course_end = document.getElementsByClassName('course-end')[m].value;      // 获取截止的周
            let course_else = document.getElementsByClassName('course-else')[m].value;    // 获取其他不连续的周
            // 保存成员输入的数据
            member_star[temp] = course_star;
            member_end[temp] = course_end;
            member_else[temp] = course_else;

            let week = [];
            let noneweek = [];
            // 提取第几周到第几周成数组
            if (course_star) {
                week[0] = parseInt(course_star);
                for ( let i = 1,l = course_end - course_star; i <= l; i++ ){
                    week[i] = parseInt(week[i-1]) + 1;
                }
            }
            // 添加额外不连续的周 进数组
            let num = course_else.match(/\d+/g);
            if (num) {
                for (let j = 0, l = num.length; j < l; j++) {
                    week.push(parseInt(num[j]));
                }
            }
            // 不用上课的周的数组
            for (let t = 1; t < WEEKS+1; t++) {
                if( week.indexOf(t) == -1 ) {
                    noneweek.push(t);
                }
            }
            userCourses.push({ user: member[CURRENTMEMBER], courseId: j, weekday: x, noneCourseWeeks: noneweek });
        }
    }
    console.log('done getValue.');
}

// 修改userCourse数据
function changeValue() {
    let t = 1;
    if ($('#form1').is('.form-current') == true) {
        t = 0;
    }
    for (let x = 0; x < 7; x++ ) {
        for (let j = 0; j < 6; j++) {
            let m = j + x * 6 + t * 42;
            let temp = j + x * 6 + CURRENTMEMBER * 42;
            let course_star = document.getElementsByClassName('course-star')[m].value;    // 获取开始的周
            let course_end = document.getElementsByClassName('course-end')[m].value;      // 获取截止的周
            let course_else = document.getElementsByClassName('course-else')[m].value;    // 获取其他不连续的周
            // 修改成员输入的数据
            member_star[temp] = course_star;
            member_end[temp] = course_end;
            member_else[temp] = course_else;

            let week = [];
            let noneweek = [];
            // 提取第几周到第几周成数组
            if (course_star) {
                week[0] = parseInt(course_star);
                for ( let i = 1,l = course_end - course_star; i <= l; i++ ){
                    week[i] = parseInt(week[i-1]) + 1;
                }
            }
            // 添加额外不连续的周 进数组
            let num = course_else.match(/\d+/g);
            if (num) {
                for (let j = 0, l = num.length; j < l; j++) {
                    week.push(parseInt(num[j]));
                }
            }
            // 不用上课的周的数组
            for (let t = 1; t < WEEKS+1; t++) {
                if( week.indexOf(t) == -1 ) {
                    noneweek.push(t);
                }
            }
            userCourses[temp].noneCourseWeeks = noneweek;
        }
    }
    console.log('done changeValue.');
}

// 导入要显示的成员的数据
function importValue() {
    let if_form2 = 1;
    if ($('#form1').is('.form-current') == true) {
        if_form2 = 0;
        console.log("form1出现");
    }
    for (let x = 0; x < 7; x++ ) {
        for (let j = 0; j < 6; j++) {
            let m = j + x * 6 + if_form2 * 42;
            let temp = j + x * 6 + CURRENTMEMBER * 42;
            document.getElementsByClassName('course-star')[m].value = member_star[temp];
            document.getElementsByClassName('course-end')[m].value = member_end[temp];
            document.getElementsByClassName('course-else')[m].value = member_else[temp];
        }    
    }
}

// 添加新成员按钮以及点击导航栏姓名功能
window.onload = function() {
    var oBtn = document.getElementById("new-member");
    var oUl = document.getElementById("members");
    var aLi = oUl.getElementsByTagName('li');
    // 点击导航栏的名字功能
    function clickNav() {
        for (let i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
        }
        oUl.onclick = function() {
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == 'li'){
                if (IF_FIRST[CURRENTMEMBER] === 1) {
                    changeValue();
                } else {
                    getValue();
                    IF_FIRST[CURRENTMEMBER] = 1;
                }
                CURRENTMEMBER = target.index;
                INPUT_NAME.value = document.getElementsByClassName('member')[CURRENTMEMBER].innerHTML;
                changeForm();
                importValue();
            }
        }
    };
    // 点击添加新成员按钮
    oBtn.onclick = function(){
        // 输入新建成员的姓名
        let str = window.prompt("请输入姓名:","");
        // 判断是否已经输入名字，然后新建成员表格滑下显示
        if (str) {
            if (IF_INTRODUCE) {
                document.getElementsByClassName('introduce')[0].className = 'introduce form-hide';
                $("#form1").attr("class", "form-content form-current");
                IF_INTRODUCE = false;
            } else {
                // 提交前一个成员的数据并保存数据
                if (IF_FIRST[CURRENTMEMBER] === 1) {
                    changeValue();
                } else {
                    getValue();

                    IF_FIRST[CURRENTMEMBER] = 1;    // 数据写入到userCourses里了
                }
                // 交换表格并清掉数据
                changeForm();
                // 添加新成员
                CURRENTMEMBER = member.length;
            }
            INPUT_NAME.value = str;
            // 向导航栏添加成员并赋予功能
            var oLi = document.createElement('li');
            oLi.innerHTML = str;
            oLi.className = "member";
            oUl.appendChild(oLi);
            clickNav();
            // 新建对象
            member[CURRENTMEMBER] = str;
        }
    };
};


// 删除成员按钮功能
function delMember() {
    if (!IF_INTRODUCE) {
        // 更换表格
        if (CURRENTMEMBER > 0 || member.length > 1) {
            // 更换页面表格
            changeForm();
        } else if (CURRENTMEMBER === 0) {
            // 清空表格数据
            for (let m = 0; m < 2; m++ ){
                for(let x = 0; x < 7; x++) {
                    for (let j = 0; j < 6; j++) {
                        let m = j + x * 6;
                        document.getElementsByClassName('once-tex')[m].value = [];
                    }
                }
            }
            $("#form1").attr("class", "form-content form-hide");
            $("#form2").attr("class", "form-content form-hide");
            // 姓名框变成即将展示的成员姓名
            let IF_INTRODUCE = true;
        }
        // 清除已经提交到userCourse的数据和保存的成员输入数据
        if (IF_FIRST[CURRENTMEMBER] === 1) {
            let w = CURRENTMEMBER * 42;
            userCourses.splice(w, 42);
            member_star.splice(w, 42);
            member_end.splice(w, 42);
            member_else.splice(w, 42);
        }
        // 清除导航栏的该成员的li标签
        $("#members li:eq(" + CURRENTMEMBER + ")").remove();
        // 清除当前成员
        member.splice(CURRENTMEMBER,1);
        IF_FIRST.splice(CURRENTMEMBER,1);
        // 姓名框变成即将展示的成员姓名（最后一个成员）
        CURRENTMEMBER = member.length - 1;
        INPUT_NAME.value =  member[CURRENTMEMBER] || '姓名';
        // 导入要显示的成员的数据
        if (!IF_INTRODUCE) {
            importValue();
        }
    }
}

// 计算空课表按钮功能
function NoCourseTable() {
    if (!IF_INTRODUCE) {
        if (IF_FIRST[CURRENTMEMBER] === 1) {
            changeValue();
        } else {
            getValue();
            IF_FIRST[CURRENTMEMBER] = 1;
        }
        // 清空表格数据
        for (let w = 0; w < 2; w++) {
            for (let x = 0; x < 7; x++ ) {
                for (let j = 0; j < 6; j++) {
                    let m = j + x * 6 + w * 42;
                    document.getElementsByClassName('course-star')[m].value = '';
                    document.getElementsByClassName('course-end')[m].value = '';
                    document.getElementsByClassName('course-else')[m].value = '';
                }
            }
        }
        CURRENTMEMBER = member.length - 1;
        // 将userCourse所有数据写入课表COURSETABLES
        userCourses.forEach(userCourse => {
            userCourse.noneCourseWeeks.forEach(week => {
              COURSETABLES[week - 1][userCourse.courseId][userCourse.weekday].push(userCourse.user);
            })
        })
        var choiceweek = document.getElementById('choice-week').selectedIndex;
        for (let x = 0; x < 7; x++) {
            for (let j = 0; j < 6; j++) {
                let m1 = j + x * 6;
                document.getElementsByClassName('once-tex')[m1].value = COURSETABLES[choiceweek][j][x];
            }
        }
        document.getElementById('all_input').style.top = '-650px';
        document.getElementById('all_input').style.display = 'none';
        document.getElementById('none-course').style.display = 'block';
        document.getElementById('none-course').style.opacity = 1;
    }
}

// 选择展示周
function mySelect() {
    let sel_button = document.getElementById('choice-week');
    let my_select = sel_button.selectedIndex;
    if ($('#week1').is('.week-current') == true) {
        // 清空表格数据并写入新的数据
        for (let x = 0; x < 7; x++ ) {
            for (let j = 0; j < 6; j++) {
                let m1 = j + x * 6;
                let m2 = j + x * 6 + 42;
                document.getElementsByClassName('once-tex')[m1].value = '';
                document.getElementsByClassName('once-tex')[m2].value = COURSETABLES[my_select][j][x];
            }
        }
        $("#week1").attr("class", "fianll-table week-hide");
        $("#week2").attr("class", "fianll-table week-current");
    } else if ($('#week2').is('.week-current') == true) {
        $("#week2").attr("class", "fianll-table week-hide");
        $("#week1").attr("class", "fianll-table week-current");
        // 清空表格数据并写入新的数据
        for (let x = 0; x < 7; x++ ) {
            for (let j = 0; j < 6; j++) {
                let m1 = j + x * 6;
                let m2 = j + x * 6 + 42;
                document.getElementsByClassName('once-tex')[m2].value = '';
                document.getElementsByClassName('once-tex')[m1].value = COURSETABLES[my_select][j][x];
            }
        }
    }
}

// 清空数据
function deleteDate() {
    // 清空COURSETABLES的数据
    for (let i = 0; i < WEEKS; i++) {
        for (let j = 0; j <= 5; j++) {
            for(let k = 0; k <= 6; k++) {
                COURSETABLES[i][j][k].length = 0;
            }
        }
    }
    // 清空空课表表格数据
    $("#week2").attr("class", "fianll-table week-hide");
    $("#week1").attr("class", "fianll-table week-current");
    for (let x = 0; x < 7; x++ ) {
        for (let j = 0; j < 6; j++) {
            let m1 = j + x * 6;
            let m2 = j + x * 6 + 42;
            document.getElementsByClassName('once-tex')[m1].value = '';
            document.getElementsByClassName('once-tex')[m2].value = '';
        }
    }
}

// 返回输入页面按钮
function backInput() {
    document.getElementById('none-course').style.opacity = 0;
    document.getElementById('none-course').style.display = 'none';
    document.getElementById('all_input').style.display = 'block';
    document.getElementById('all_input').style.top = '0px';
    changeForm();
    importValue();
    INPUT_NAME.value = member[CURRENTMEMBER];
    deleteDate();
}