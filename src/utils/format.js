function fillIn(index) {
  return index > 9 ? index : "0" + index;
}
export default function (timeStamp, form) {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = fillIn(month);
  let day = date.getDate();
  day = fillIn(day);
  let hour = date.getHours();
  hour = fillIn(hour);
  let minute = date.getMinutes();
  minute = fillIn(minute);
  let second = date.getSeconds();
  second = fillIn(second);
  const weekDay = date.getDay();
  const week = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];
  if (form) {
    return form
      .replace("yyyy", year)
      .replace("mm", month)
      .replace("dd", day)
      .replace("hh", hour)
      .replace("mm", minute)
      .replace("ss", second)
      .replace("ww", week[weekDay]);
  }
  return `${year}-${month}-${day} ${hour}:${minute}:${second} ${week[weekDay]}`;
}
