// 将数组按指定大小分块
export const chunk = (arr = [], size = 1) => arr.length 
  ? arr.reduce((total, currentValue) => (
      total[total.length - 1].length === size 
        ? total.push([currentValue]) 
        : total[total.length - 1].push(currentValue), 
      total
    ), [[]])
  : [];

// 根据数据总数和每页大小生成页码对象（以页码为key）
export function generatePages(totalPage) {
  const pages = {};
  for (let i = 1; i <= totalPage; i++) {
    pages[i] = {
      label: '' + i
    };
  }
  return pages;
}
