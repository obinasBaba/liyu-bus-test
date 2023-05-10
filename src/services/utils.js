import * as html2pdf from 'html2pdf.js';

function demohtmltopdf(id, fileName) {
  const element = document.getElementById(`${id}`);
  const opt = {
    margin: 1,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 3, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
  };
  html2pdf().from(element).set(opt).save();
}

const getDateArray = (start, end) => {
  let arr = new Array(),
    dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
};

function diff(start, end) {
  start = start.split(':');
  end = end.split(':');
  let startDate = new Date(0, 0, 0, start[0], start[1], 0);
  const endDate = new Date(0, 0, 0, end[0], end[1], 0);
  let diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / 1000 / 60);

  return (
    (hours < 9 ? '0' : '') + hours + ':' + (minutes < 9 ? '0' : '') + minutes
  );
}

export { demohtmltopdf, getDateArray, diff };
