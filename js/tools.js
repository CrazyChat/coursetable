// 清除表格的数据以供其他成员使用
function deleteFormValue(whichForm) {
    for (let weekdayCount = 0; weekdayCount < 7; weekdayCount++ ) {
        for (let sectionCount = 0; sectionCount < 6; sectionCount++) {
            let tableCount = sectionCount + weekdayCount * 6 + whichForm * 42;
            document.getElementsByClassName('course-star')[tableCount].value = '';
            document.getElementsByClassName('course-end')[tableCount].value = '';
            document.getElementsByClassName('course-else')[tableCount].value = '';
        }
    }
}

// 交换表格并清掉数据
function changeForm(allHide) {
    if ($('#form1').is('.form-current') == true) {
        $("#form1").attr("class", "form-content form-hide");
        $("#form2").attr("class", "form-content form-current");
        // 清空表格数据
        deleteFormValue(0);
    } else if ($('#form2').is('.form-current') == true) {
        $("#form2").attr("class", "form-content form-hide");
        $("#form1").attr("class", "form-content form-current");
        // 清空表格数据
        deleteFormValue(1)
    } else if (allHide) {
        $("#form1").attr("class", "form-content form-hide");
        $("#form2").attr("class", "form-content form-hide");
    } else if (!allHide) {
        $("#form1").attr("class", "form-content form-current");
    }
    return;
}

// 点击导航栏名字功能
function clickNav() {
    let MemberFather = document.getElementById("members");
    let Member = MemberFather.getElementsByTagName('li');
    // 给成员加索引
    for (let i = 0; i < Member.length; i++) {
        Member[i].index = i;
    }
    // 点击各个Member发生事件委托
    MemberFather.onclick = function() {
        var ev = ev || window.event;   // 使用let会报错?
        let target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == 'li'){
            if (IF_FIRST[CURRENTMEMBER] === 1) {
                changeValue();
            } else {
                getValue();
                IF_FIRST[CURRENTMEMBER] = 1;
            }
            CURRENTMEMBER = target.index;
            INPUT_NAME.value = document.getElementsByClassName('member')[CURRENTMEMBER].innerHTML;
            if (IfImport) {
                document.getElementsByClassName('introduce')[0].className = 'introduce form-hide';
            } 
            changeForm();
            importValue();
        }
    }
}

// 向userCourse写入数据函数
function addCourse( user, courseId, weekday, noneCourseWeeks) {
    userCourses.push({ user, courseId, weekday, noneCourseWeeks });
}

// 修改userCourse数据
function changeValue() {
    if ($('#form1').is('.form-current') == true || $('#form2').is('.form-current') == true){
        let whichForm = 0
        if ( $('#form2').is('.form-current') == true ) {
            whichForm = 1
        }
        for (let weekdayCount = 0; weekdayCount < 7; weekdayCount++ ) {
            for (let sectionCount = 0; sectionCount < 6; sectionCount++) {
                let tableCount = sectionCount + weekdayCount * 6 + whichForm * 42;        // 当前编辑成员的表格序号
                let ValueIndex = sectionCount + weekdayCount * 6 + CURRENTMEMBER * 42;          // 当前编辑成员保存在数组的位置段索引
                let course_star = document.getElementsByClassName('course-star')[tableCount].value;    // 获取开始的周
                let course_end = document.getElementsByClassName('course-end')[tableCount].value;      // 获取截止的周
                let course_else = document.getElementsByClassName('course-else')[tableCount].value;    // 获取其他不连续的周
                // 修改成员输入的数据
                member_star[ValueIndex] = course_star;
                member_end[ValueIndex] = course_end;
                member_else[ValueIndex] = course_else;
    
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
                userCourses[ValueIndex].noneCourseWeeks = noneweek;
            }
        }
    }
}

// 导入要显示的成员的数据
function importValue() {
    let whichForm = 0;
    if ($('#form2').is('.form-current') == true) {
        whichForm = 1;
    }
    for (let weekdayCount = 0; weekdayCount < 7; weekdayCount++ ) {
        for (let sectionCount = 0; sectionCount < 6; sectionCount++) {
            let tableCount = sectionCount + weekdayCount * 6 + whichForm * 42;
            let ValueIndex = sectionCount + weekdayCount * 6 + CURRENTMEMBER * 42;          // 保存在数组的位置段索引
            document.getElementsByClassName('course-star')[tableCount].value = member_star[ValueIndex];
            document.getElementsByClassName('course-end')[tableCount].value = member_end[ValueIndex];
            document.getElementsByClassName('course-else')[tableCount].value = member_else[ValueIndex];
        }    
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
    $("#week1").attr("class", "fianll-table week-current");
    for (let x = 0; x < 7; x++ ) {
        for (let j = 0; j < 6; j++) {
            let m = j + x * 6;
            document.getElementsByClassName('once-tex')[m].innerHTML = '';
        }
    }
}

// 遍历tex获取最高的高度，改变所有tex高度为它,使所有小格高度一致为最小
function uniteHeight() {
    let maxHeight = 100;
    for (let days = 0; days < 7; days++ ) {
        for (let sec = 0; sec < 6; sec++ ) {
            let sort = sec + days * 6;
            if ( document.getElementsByClassName('once-tex')[sort].scrollHeight > maxHeight ) {
                maxHeight = document.getElementsByClassName('once-tex')[sort].scrollHeight;
            }
        }
    }
    if (maxHeight > 100) {
        for (let days = 0; days < 7; days++ ) {
            for (let sec = 0; sec < 6; sec++ ) {
                let sort = sec + days * 6;
                document.getElementsByClassName('once-tex')[sort].style.height = maxHeight + 'px';
            }
        }
        for (let sec = 0; sec < 6; sec++) {
            document.getElementsByClassName('finall-section')[sec].style.height = maxHeight + 'px';
            document.getElementsByClassName('finall-section')[sec].style.lineHeight = maxHeight + 'px';
        }
    }
}