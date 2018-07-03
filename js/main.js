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
        ]
    }
})
var courseSections = new Vue({
    el: '#course-sections',
    data: {
        items: [
            { message: '1-2'},
            { message: '3-4'},
            { message: '5-6'},
            { message: '7-8'},
            { message: '9'},
            { message: '10-11'},
        ]
    }
})


// 创建个人课程表，二维数组[36][haveCourse]
var user = new Array();

// 获取填入表格的数据，并写入个人课程表
function getValue() {
    let week_num = 0;
    let day_num = 0;
    //m表示课时，0~5表示：1-2，3-4，5-6，7-8，9，10-11
    for (let m = 0;m < 36; m++ ){
        var week = [];
        var course_star = document.getElementsByClassName('course-star')[m].value;    // 获取开始的周
        var course_end = document.getElementsByClassName('course-end')[m].value;      // 获取截止的周
        var course_else = document.getElementsByClassName('course-else')[m].value;    // 获取其他不连续的周
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
        user[m] = week;
        /*for (let t = 0; t < 16; t++ ) {
            console.log(week[t]);
            user[m][t] = week[t];
        }*/
        console.log(week);
        console.log(user[m]);
    }
    console.log(user);
}