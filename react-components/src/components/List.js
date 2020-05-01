import React from 'react';

function List(props) {
  const lists = props.dataSource.map((list, key) => {
    return <li key={key}>{ list.name }</li>;
  });
  return (
    <ul className="m-list">
      { lists }
    </ul>
  );
}

export default List;
