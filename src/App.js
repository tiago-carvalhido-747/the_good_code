import "./App.css";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import List from "./components/List.component.js";
import FactModal from "./components/FactModal.component";
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [numberOfFacts, setNumberOfFacts] = useState(435);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsSelected, setRowsSelected] = useState([]);

  const columns = [
    {
      title: "Fact",
      dataIndex: "fact",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => deleteRowFact(record.key)}
        ></Button>
      ),
    },
  ];

  //Get Data from API
  const getData = async () => {
    const response = await fetch(
      `https://dog-api.kinduff.com/api/facts?number=${numberOfFacts}`
    );

    const dataFromAPi = await response.json();
    console.log(dataFromAPi);

    const mappedData = dataFromAPi.facts.map((fact, index) => ({
      key: index,
      fact: fact,
    }));

    setData(mappedData);
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const removeFacts = () => {
    const newData = data.filter(function (el) {
      return rowsSelected.indexOf(el.key) < 0;
    });

    setData(newData);
  };

  const addNewFact = (newFact) => {
    const aux = [...data, newFact];

    setData(aux);
  };

  const deleteRowFact = (rowKey) => {
    const aux = data.filter((fact) => fact.key !== rowKey);
    setData(aux);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [data]);

  useEffect(() => {
    console.log("rowsSelected", rowsSelected);
  }, [rowsSelected]);

  return (
    <div className="container">
      <div className="add-container">
        <Button
          onClick={handleShowModal}
          className="add-button"
          type="primary"
          icon={<PlusOutlined />}
        >
          Add a new fact
        </Button>
        <Button
          onClick={removeFacts}
          className="delete-button"
          type="primary"
          icon={<DeleteOutlined />}
        >
          Delete selected rows
        </Button>
      </div>
      <List
        removeRow={deleteRowFact}
        setRowsFunction={setRowsSelected}
        columns={columns}
        data={data}
      ></List>
      <FactModal
        addNewFact={addNewFact}
        arrayLength={data.length}
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
      ></FactModal>
    </div>
  );
}

export default App;
