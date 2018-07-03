const weeks = 20 // 表示学期的周数为20周，可以设置为让用户输入

const courseTables = [] // 20个周的课程表, courseTables[0]表示第一周的课表
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

const user1 = { id: 1, name: '陈铭涛' }
const user2 = { id: 2, name: '彭彦滨' }

// 存储所有人的课程
const userCourses = [
  /**
   * courseId表示课时，0~5表示：1-2，3-4，5-6，7-8，9，10-11
   * weekday表示周几，0~6表示周一到周日
   * haveCourseWeeks表示有课的周
   */
  { user: user1, courseId: 0, weekday: 0, haveCourseWeeks: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] }, // 陈铭涛在1~7、10~12周周一的1~2节有课
  { user: user1, courseId: 2, weekday: 1, haveCourseWeeks: [4, 5, 6, 7, 8, 10, 11, 12] }, // 陈铭涛在5~8、10~12周周二的5-6节有课
  { user: user2, courseId: 0, weekday: 0, haveCourseWeeks: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] }  // 彭彦滨在1~7、10~12周周一的1~2节有课
]


userCourses.forEach(userCourse => {
  userCourse.haveCourseWeeks.forEach(week => {
    courseTables[week - 1][userCourse.courseId][userCourse.weekday].push(userCourse.user)
  })
})

console.log('courseTables -----> ', courseTables[0])
console.log('courseTables -----> ', courseTables[3])
