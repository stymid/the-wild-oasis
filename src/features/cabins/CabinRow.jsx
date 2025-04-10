import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import toast from "react-hot-toast";
import CustomToast from "../../ui/CustomToast";

import { MdOutlineDeleteOutline } from "react-icons/md";

import { useCreateCabin } from "./useCreateCabin";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack } from "react-icons/hi2";

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

  const { deleteCabin, isDeleting } = useDeleteCabin();

  const { createCabin } = useCreateCabin();
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
    <Table.Row role="row">
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
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="cabin-delete">
                <Menus.Button icon={<MdOutlineDeleteOutline />}>
                  Delete
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="cabin-update">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="cabin-update">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Window name="cabin-delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={handleClick}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
