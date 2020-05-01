import React, { useState } from 'react';
import Button from './Button';
import Pager from './Pager';

function Pagination(props) {
  const { total, defaultCurrent, defaultPageSize, onChange } = props;
  const [current, setPage] = useState(defaultCurrent);
  const totalPage = Math.ceil(total / defaultPageSize);
  return (
    <div className="m-pagination">
      <Button className="btn-prev" onClick={() => {
        if (current < 2) return;
        setPage(current - 1);
        onChange(current - 1);
      }}>&lt;</Button>
      <Pager totalPage={totalPage} defaultCurrent={current} onChange={(current) => {
        setPage(current);
        onChange(current);
      }}></Pager>
      <Button className="btn-next" onClick={() => {
        if (current >= totalPage) return;
        setPage(current + 1);
        onChange(current + 1);
      }}>></Button>
    </div>
  );
}

export default Pagination;
