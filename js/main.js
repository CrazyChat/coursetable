console.log('author: 陈铭涛');
console.log('School: 佛山科学技术学院');
console.log('Class: 17计算机科学与技术1班');
console.log('WeChat: L13049045466');

let CurrentMember = 0;   // 计算当前是哪个成员
let If_StarPage = true;    // 判断当前是否为介绍页面
let Input_Name = document.getElementsByClassName('left-name')[0];  // 名字输入框的姓名
let Weeks = 16 // 表示学期的周数为16周，可以设置为让用户输入
let If_First = [];       // 判断成员数据是否已经提交到了userCourses
// 保存每个成员的数据
let member_star = [];
let member_end = [];
let member_else = [];
let COURSETABLES = [] // 16个周的课程表, COURSETABLES[0]表示第一周的课表
for (let i = 0; i < Weeks; i++) {
    /**
     * push的是一个周课程表，假设叫做courseTable，三维数组，courseTable[i][j]是一个数组，存储着当前课程时间段内有课的人及其有课的周
     * i表示课时，取值范围为0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * j表示周几，取值范围为0~6表示：周一到周日，注意：0表示周一
     * 例子：courseTable[0][2] = [ { user: { id: 1, name: '陈铭涛' }, noneCourseWeeks: [1, 2, 3] } ] 表示陈铭涛在1~3周的周三的1-2节课无课
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
let user = new Array();
// 创建成员
let member = [];

// 存储所有人的课程
let userCourses = [
    /**
     * courseId表示课时，0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * weekday表示周几，0~6表示周一到周日
     * noneCourseWeeks表示无课的周
     */
    // { user: member[0], courseId: 0, weekday: 0, noneCourseWeeks: [] },  陈铭涛在...周周一的1~2节无课
]

// 姓名输入框的修改
function changeName() {
    if ($('#introduce').is('.form-current') !== true) {
        document.getElementsByClassName('member')[CurrentMember].innerHTML = Input_Name.value;
        member[CurrentMember] = Input_Name.value;
    }
}