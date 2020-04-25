const regex = /(^\/\/.*$)|(^\#.*$)|(^\/\*.*$)|(^move forward *(\/\/.*)*(\#.*)*(\/\*.*)*$)|(^turn left *(\/\/.*)*(\#.*)*(\/\*.*)*$)|(^turn right *(\/\/.*)*(\#.*)*(\/\*.*)*$)|(^ *(\/\/.*)*(\#.*)*(\/\*.*)*$)/;
const str = `turn right    # sdfqsdfqsdq  `;
let m;

if ((m = regex.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    console.log(m)
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}