
let CURRENTMEMBER = 0;   // 计算当前是哪个成员
let MEMBERNAME = [];    // 记录成员姓名
let IF_INTRODUCE = true;    // 判断当前是否为介绍页面
const WEEKS = 16 // 表示学期的周数为16周，可以设置为让用户输入
const COURSETABLES = [] // 16个周的课程表, COURSETABLES[0]表示第一周的课表
for (let i = 0; i < WEEKS; i++) {
    /**
     * push的是一个周课程表，假设叫做courseTable，三维数组，courseTable[i][j]是一个数组，存储着当前课程时间段内有课的人及其有课的周
     * i表示课时，取值范围为0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * j表示周几，取值范围为0~6表示：周一到周日，注意：0表示周一
     * 例子：courseTable[0][2] = [ { user: { id: 1, name: '陈铭涛' }, haveCourseWeeks: [1, 2, 3] } ] 表示陈铭涛在1~3周的周三的1-2节课有课
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
member[0] = '陈铭涛';


// 存储所有人的课程
const userCourses = [
    /**
     * courseId表示课时，0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * weekday表示周几，0~6表示周一到周日
     * haveCourseWeeks表示有课的周
     */
    { user: member[0], courseId: 0, weekday: 0, haveCourseWeeks: [] }, // 陈铭涛在1~7、10~12周周一的1~2节有课
    { user: member[0], courseId: 0, weekday: 0, haveCourseWeeks: [] }
]


// 向userCourse写入数据函数
function addCourse( user, courseId, weekday, haveCourseWeeks) {
    userCourses.push({ user, courseId, weekday, haveCourseWeeks });
}

// 获取输入的课表并写入userCourse
function getValue() {
    for (let w = 0; w <= CURRENTMEMBER; w++ ){
        for (let x = 0; x < 7; x++ ) {
            for (let j = 0; j < 6; j++) {
                let m = j + x * 6 + w * 42;
                let course_star = document.getElementsByClassName('course-star')[m].value;    // 获取开始的周
                let course_end = document.getElementsByClassName('course-end')[m].value;      // 获取截止的周
                let course_else = document.getElementsByClassName('course-else')[m].value;    // 获取其他不连续的周
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
                addCourse(member[w], j, x, noneweek);
            }
        }
    }
}

// 添加新成员按钮功能
function addMember(){
    // 输入新建成员的姓名
    let str = window.prompt("请输入姓名:","");
    // 判断是否已经输入名字，然后新建成员表格滑下显示
    if (str) {
        if (IF_INTRODUCE) {
            MEMBERNAME[0] = str;
            document.getElementsByClassName('introduce')[0].className = 'introduce form-hide';
            document.getElementsByClassName('form-content')[0].className = "form-content form-current";
            document.getElementsByClassName('member')[0].innerHTML = str;
            document.getElementsByClassName('left-name')[0].value = str;
            IF_INTRODUCE = false;
        } else {
            MEMBERNAME[CURRENTMEMBER] = document.getElementsByClassName('left-name')[0].value;
            CURRENTMEMBER = CURRENTMEMBER + 1;
            document.getElementsByClassName('member')[CURRENTMEMBER].innerHTML = str;
            document.getElementsByClassName('left-name')[0].value = str;
            document.getElementsByClassName('form-content')[CURRENTMEMBER-1].className = "form-content form-hide";
            document.getElementsByClassName('form-content')[CURRENTMEMBER].className = "form-content form-current";
        }
        // 新建对象
        member[CURRENTMEMBER] = str;
    }
}

// 删除成员按钮功能
function delMember() {
    if (CURRENTMEMBER > 0) {
        CURRENTMEMBER = CURRENTMEMBER - 1;
        document.getElementsByClassName('left-name')[0].value = MEMBERNAME[CURRENTMEMBER];
        document.getElementsByClassName('member')[CURRENTMEMBER].innerHTML = '';
        document.getElementsByClassName('form-content')[CURRENTMEMBER+1].className = "form-content form-hide";
        document.getElementsByClassName('form-content')[CURRENTMEMBER].className = "form-content form-current";
        console.log('CURRENTMEMBER ---> ', CURRENTMEMBER);
    } else if (CURRENTMEMBER === 0) {
        document.getElementsByClassName('left-name')[0].value = '姓名';
        document.getElementsByClassName('member')[0].innerHTML = '';
        document.getElementsByClassName('form-content')[0].className = "form-content form-hide";
        document.getElementsByClassName('introduce')[0].className = 'introduce form-current';
        IF_INTRODUCE = true;
    } else {
        return;
    }
}

// 打印每周的空课表
function printCourse() {
    for (let all = 0; all < WEEKS; all++) {
        for(let x = 0; x < 7; x++) {
            for (let j = 0; j < 6; j++) {
                let m = j + x * 6 + all * 42;
                document.getElementsByClassName('once-tex')[m].value = COURSETABLES[all][j][x];
            }
        }
    }
}

// 计算空课表按钮功能
function NoCourseTable() {
    CURRENTMEMBER = 
    getValue();
    // 将userCourse所有数据写入课表COURSETABLES
    userCourses.forEach(userCourse => {
        userCourse.haveCourseWeeks.forEach(week => {
          COURSETABLES[week - 1][userCourse.courseId][userCourse.weekday].push(userCourse.user);
        })
    })
    printCourse();
    document.getElementById('all_input').style.top = '-650px';
    document.getElementById('none-course').style.display = 'block';
    document.getElementById('none-course').style.opacity = 1;
}
