// 点击添加新成员按钮
function newMember(){
    // 输入新建成员的姓名
    let str = window.prompt("请输入姓名:","");
    // 判断是否已经输入名字，然后新建成员表格滑下显示
    if (str) {
        if (If_StarPage) {
            If_StarPage = false;
        } else {
            // 提交前一个成员的数据并保存数据
            if (If_First[CurrentMember] === 1) {
                changeValue();
            } else {
                getValue();
                If_First[CurrentMember] = 1;    // 数据写入到userCourses里了
            }
            // 添加新成员
            CurrentMember = member.length;
        }
        let memberFather = document.getElementById("members");
        // 交换表格并清掉数据
        changeForm(false);
        Input_Name.value = str;
        // 向导航栏添加成员并赋予功能
        let oLi = document.createElement('li');
        oLi.innerHTML = str;
        oLi.className = "member";
        memberFather.appendChild(oLi);
        clickNav();
        // 新建对象
        member[CurrentMember] = str;
    }
}
// 点击删除成员按钮
function deleteMember(){
    if (member.length > 0 && ($('#form1').is('.form-current') == true || $('#form2').is('.form-current') == true)) {
        if (confirm('确定要删除该成员？？？')) {
            // 更换表格
            if (CurrentMember > 0 || member.length > 1) {
                // 更换页面表格
                changeForm();
            } else if (CurrentMember === 0 && member.length === 1) {
                // 清空表格数据
                changeForm();
                $("#form1").attr("class", "form-content form-hide");
                $("#form2").attr("class", "form-content form-hide");
                $("#introduce").attr("class", "form-current");
                //
                If_StarPage = true;
            }
            // 清除已经提交到userCourse的数据和保存的成员输入数据
            if (If_First[CurrentMember] === 1) {
                let ValueIndex = CurrentMember * eachTableCounts;
                userCourses.splice(ValueIndex, eachTableCounts);
                member_star.splice(ValueIndex, eachTableCounts);
                member_end.splice(ValueIndex, eachTableCounts);
                member_else.splice(ValueIndex, eachTableCounts);
            }
            // 清除导航栏的该成员的li标签
            $("#members li:eq(" + CurrentMember + ")").remove();
            // 清除当前成员
            member.splice(CurrentMember,1);
            If_First.splice(CurrentMember,1);
            // 姓名框变成即将展示的成员姓名（最后一个成员）
            CurrentMember = member.length - 1;
            Input_Name.value =  member[CurrentMember] || '姓名';
            // 导入要显示的成员的数据
            if (!If_StarPage) {
                importValue();
            }
            clickNav();
        }
    } else {
        alert('当前没有选择成员,请先选择成员');
    }
}

// 计算空课表按钮功能
function NoCourseTable() {
    if (!If_StarPage) {
        document.getElementById('introduce').className = 'form-hide';
        // 提交当前修改的成员数据
        if (If_First[CurrentMember] === 1) {
            changeValue();
        } else {
            getValue();
            If_First[CurrentMember] = 1;
        }
        CurrentMember = member.length - 1;
        // 将userCourse所有数据写入课表COURSETABLES
        userCourses.forEach(userCourse => {
            userCourse.noneCourseWeeks.forEach(week => {
              COURSETABLES[week - 1][userCourse.courseId][userCourse.weekday].push(userCourse.user);
            })
        })
        let choiceweek = document.getElementById('choice-week').selectedIndex;
        for (let weekdayCount = 0; weekdayCount < weekdayCounts; weekdayCount++) {
            for (let sectionCount = 0; sectionCount < sectionCounts; sectionCount++) {
                let tableCount = sectionCount + weekdayCount * sectionCounts;
                document.getElementsByClassName('once-tex')[tableCount].innerHTML = COURSETABLES[choiceweek][sectionCount][weekdayCount];
            }
        }
        document.getElementById('all_input').style.top = '-650px';
        document.getElementById('all_input').style.display = 'none';
        document.getElementById('none-course').style.display = 'block';
        document.getElementById('none-course').style.opacity = 1;
        uniteHeight();
    } else {
        alert('当前没有可操作成员,请先添加成员');
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
    Input_Name.value = member[CurrentMember];
    deleteDate();
}

// 选择展示周
function mySelect() {
    let sel_button = document.getElementById('choice-week');
    let whichWeek = sel_button.selectedIndex;
    for (let weekdayCount = 0; weekdayCount < weekdayCounts; weekdayCount++) {
        for (let sectionCount = 0; sectionCount < sectionCounts; sectionCount++) {
            let tableCount = sectionCount + weekdayCount * sectionCounts;sectionCount
            document.getElementsByClassName('once-tex')[tableCount].innerHTML = COURSETABLES[whichWeek][sectionCount][weekdayCount];
        }
    }
    uniteHeight();
}
