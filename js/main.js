
var courseDays = new Vue({
    el: '#course-days',
    data: {
        items: [
            { message: '——' },
            { message: '周一' },
            { message: '周二' },
            { message: '周三' },
            { message: '周四' },
            { message: '周五' },
            { message: '周六' },
            { message: '周日' },
        ]
    }
})
var courseSections = new Vue({
    el: '#course-sections',
    data: {
        items: [
            { message: '1-2' },
            { message: '3-4' },
            { message: '5-6' },
            { message: '7-8' },
            { message: '9' },
            { message: '10-11' },
        ]
    }
})

const weeks = 16 // 表示学期的周数为16周，可以设置为让用户输入
const courseTables = [] // 16个周的课程表, courseTables[0]表示第一周的课表
for (let i = 0; i < weeks; i++) {
    /**
     * push的是一个周课程表，假设叫做courseTable，三维数组，courseTable[i][j]是一个数组，存储着当前课程时间段内有课的人及其有课的周
     * i表示课时，取值范围为0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * j表示周几，取值范围为0~6表示：周一到周日，注意：0表示周一
     * 例子：courseTable[0][2] = [ { user: { id: 1, name: '陈铭涛' }, haveCourseWeeks: [1, 2, 3] } ] 表示陈铭涛在1~3周的周三的1-2节课有课
     */
    courseTables.push([
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
const user1 = { id: 0, name: '陈铭涛' };
const user2 = { id: 1, name: '陈帅哥' };
const user3 = { id: 2, name: '陈大大' };



// 存储所有人的课程
const userCourses = [
    /**
     * courseId表示课时，0~5表示：1-2，3-4，5-6，7-8，9，10-11
     * weekday表示周几，0~6表示周一到周日
     * haveCourseWeeks表示有课的周
     */
    { user: user1, courseId: 0, weekday: 0, haveCourseWeeks: [] }, // 陈铭涛在1~7、10~12周周一的1~2节有课
    { user: user1, courseId: 2, weekday: 1, haveCourseWeeks: [] }, // 陈铭涛在5~8、10~12周周二的5-6节有课
    { user: user2, courseId: 0, weekday: 0, haveCourseWeeks: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] },  // 陈帅哥在1~7、10~12周周一的1~2节有课
]

// 向userCourse写入数据函数
function addCourse( user, courseId, weekday, haveCourseWeeks) {
    userCourses.push({ user, courseId, weekday, haveCourseWeeks });
}

// 获取输入的课表并写入userCourse
function getValue() {
    for (let x = 0; x < 7; x++ ) {
        for (let j = 0; j < 6; j++) {
            let m = j + x * 6;
            var course_star = document.getElementsByClassName('course-star')[m].value;    // 获取开始的周
            var course_end = document.getElementsByClassName('course-end')[m].value;      // 获取截止的周
            var course_else = document.getElementsByClassName('course-else')[m].value;    // 获取其他不连续的周
            var week = [];
            // 提取第几周到第几周成数组
            if (course_star) {
                week[0] = parseInt(course_star);
                for ( var i = 1,l = course_end - course_star; i <= l; i++ ){
                    week[i] = parseInt(week[i-1]) + 1;
                }
            }
            // 添加额外不连续的周 进数组
            var num = course_else.match(/\d+/g);
            if (num) {
                for (let j = 0, l = num.length; j < l; j++) {
                    week.push(parseInt(num[j]));
                }
            }
            addCourse(user1, j, x, week);
        }
    }
    // 将userCourse所有数据写入课表courseTables
    userCourses.forEach(userCourse => {
        userCourse.haveCourseWeeks.forEach(week => {
          courseTables[week - 1][userCourse.courseId][userCourse.weekday].push(userCourse.user)
        })
    })
    console.log('courseTables -----> ', courseTables[0]);
    console.log('courseTables -----> ', courseTables[1]);
}