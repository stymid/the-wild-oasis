import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import toast from "react-hot-toast";
import CustomToast from "../../ui/CustomToast";
import { CgCopy } from "react-icons/cg";
import { MdOutlineDeleteOutline, MdModeEdit } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  const [showForm, setShowForm] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const { createCabin, isCreating } = useCreateCabin();
  function handleClick() {
    deleteCabin(id, {
      onError: (err) => {
        toast.custom((t) => (
          <CustomToast t={t} message={err.message} type="error" />
        ));
      },
      onSuccess: () => {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={"delete was succesfully."}
            type="success"
          />
        ));
      },
    });
  }
  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            {isCreating ? <AiOutlineLoading3Quarters /> : <CgCopy />}
          </button>
          <button onClick={() => setShowForm((state) => !state)}>
            <MdModeEdit />
          </button>
          <button disabled={isDeleting} onClick={handleClick}>
            {isDeleting ? (
              <AiOutlineLoading3Quarters />
            ) : (
              <MdOutlineDeleteOutline />
            )}
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;
