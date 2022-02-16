const axios = require('axios');

async function get_courses() {
    const response = await axios.get('https://saral.navgurukul.org/api/courses');
    let res = response.data;
    var value = (res["availableCourses"]);
    var c = 1
    var course_id = []
    console.log("\n")
    console.log("***************Saral Courses**********")
    console.log("\n")
    for (i of value) {
        course_id.push(c)
        console.log(`${c}. ${i.name}`)
        c += 1
    }
    return value
}

async function get_Exercise() {

    let course = await get_courses();

    const num = require('readline-sync');
    const user = num.questionInt("Enter the id number of course = ")

    user_id = course[user - 1]["id"]
    const link = await axios.get('https://saral.navgurukul.org/api/courses/' + user_id + '/exercises')
    let api2 = link.data
    let my_data = (api2['data']);
    console.log("\n")
    console.log("*******************Course List*******************")
    console.log("\n")
    let slug_data = []
    var index = 0;
    while (index < my_data.length) {
        console.log(`${index + 1}. ${my_data[index]["name"]}`);
        slug_data.push(my_data[index]["slug"])
        index += 1
    
    }
    return my_data;
}

async function get_SlugContent() {
    const exercise = await get_Exercise()
        console.log('\n')
        console.log('*******************WELCOME TO SLUG*******************')
        console.log("\n")

        const slug_input = require('readline-sync').question("Enter the  number of exercise start from 0 = ");

        var slug_content = (exercise[slug_input]['slug'])
        console.log(slug_content,"heyyy");

        const slugData = await axios.get('http://saral.navgurukul.org/api/courses/' + user_id + '/exercise/getBySlug?slug=' + slug_content);

        const content = slugData.data
        const slug_Info = content['content']
        console.log("\n")
        console.log(slug_Info)
        return slug_input
}
get_SlugContent()