import React, { useEffect, useState } from "react";
import { Table } from "antd";

const List = (props) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [currentRow, setCurrentRow] = useState({});

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRowKeys.length === 1) {
        setCurrentRow(selectedRowKeys[0]);
      }
      props.setRowsFunction(selectedRowKeys);
    },
    getCheckboxProps: (record) => {},
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={props.columns}
        dataSource={props.data}
      />
    </div>
  );
};

export default List;
