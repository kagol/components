import React, { useState, useEffect } from 'react';
import { generatePages } from '../../util';

function Pager(props) {
  const { totalPage, defaultCurrent, onChange } = props;
  const [current, setPage] = useState(defaultCurrent);
  const pages = Object.entries(generatePages(totalPage));

  let centerPages = [];

  const centerSize = 5; // 中间的页数，默认为5

  // 以下字段均基于 centerSize 计算而来
  const sideSize = (centerSize - 1) / 2;
  const jumpSize = centerSize;
  const startEllipsisSize = centerSize + 3;
  const maxLeftSize = centerSize + 1;

  const updateCenterPage = () => {
    let centerPage = current;
    if (current > pages.length - 3) {
      centerPage = pages.length - 3;
    }
    if (current < 4) {
      centerPage = 4;
    }
    if (pages.length <= startEllipsisSize) {
      const centerPage = [];
      for (let i = 2, len = pages.length; i < len; i++) {
        centerPage.push(i);
      }
      centerPages = centerPage;
    } else {
      centerPages = [centerPage - 2, centerPage - 1, centerPage, centerPage + 1, centerPage + 2 ];
    }
  }

  updateCenterPage();

  useEffect(() => {
    setPage(defaultCurrent);
  });

  return (
    <ul className="m-pager">
      <li className={'number' + (current == 1 ? ' active' : '')}
        onClick={() => {
          setPage(1);
          onChange(1);
        }}
      >1</li>

      {
        current >= centerSize && pages.length >= startEllipsisSize
        && <li className="more left" 
          onClick={() => {
            let newPage = current - jumpSize;
            if (newPage < 1) {
              newPage = 1;
            }
            setPage(newPage);
            onChange(newPage);
          }}
        ></li>
      }

      {
        centerPages.map((page, key) => {
          return (
            <li key={key} className={'number' + (page == current ? ' active' : '')}
              onClick={() => {
                setPage(page);
                onChange(page);
              }}
            >{ page }</li>
          );
        })
      }
      
      {
        current <= pages.length - centerSize + 1 && pages.length >= startEllipsisSize
        && <li className="more right" 
          onClick={() => {
            let newPage = current + jumpSize;
            if (newPage > pages.length) {
              newPage = pages.length;
            }
            setPage(newPage);
            onChange(newPage);
          }}
        ></li>
      }

      { 
        pages.length !== 1 
        && <li className={'number' + (pages.length == current ? ' active' : '')}
            onClick={() => {
              setPage(pages.length);
              onChange(pages.length);
            }}
          >{ pages.length }</li>
      }
    </ul>
  );
}

export default Pager;
