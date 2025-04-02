import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setIsOpenForm((s) => !s)} $variation="primary">
        Add new Cabin
      </Button>
      {isOpenForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
