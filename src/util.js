const capitalizeStr = (str) => {
    let splitStr = str.toLowerCase().split(' ');

    for(let i = 0; i < splitStr.length; i++){
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
}

const timeConverter = (unixTimeStamp) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const d = new Date(unixTimeStamp * 1000);

    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const date = d.getDate();

    const out = `${month} ${date} ${year}`;
    return out;
}

export {capitalizeStr, timeConverter};