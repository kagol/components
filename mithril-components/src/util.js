// 将数组按指定大小分块
export const chunk = (arr = [], size = 1) => arr.length 
  ? arr.reduce((t, v) => (
      t[t.length - 1].length === size 
        ? t.push([v]) 
        : t[t.length - 1].push(v), 
      t
    ), [[]])
  : [];

// 根据数据总数和每页大小生成页码对象（以页码为key）
export function generatePages(total, pageSize) {
  const pages = {};
  const pageNum = Math.ceil(total / pageSize);
  for (let i = 1; i <= pageNum; i++) {
    pages[i] = {
      label: '' + i
    };
  }
  return pages;
}
