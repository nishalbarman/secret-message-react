import React, { useContext, useState } from "react";
import WebContext from "../../Context/WebDetails";
import Modal from "react-bootstrap/Modal";
import BootButton from "react-bootstrap/Button";
import { Button } from "@chakra-ui/react";

function Modals() {
  const [loading, setLoading] = useState(false);
  const {
    modal: {
      modal: { isModalVisible, title, message, handleDelete, buttonText },
      setModal,
    },
  } = useContext(WebContext);

  console.log(handleDelete);

  return (
    <>
      {/* {isModalVisible ? ( */}
      <Modal
        show={isModalVisible}
        onHide={() => {
          setModal((prev) => {
            return { ...prev, isModalVisible: !isModalVisible };
          });
        }}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <BootButton
            variant="secondary"
            onClick={() => {
              setModal((prev) => {
                return { ...prev, isModalVisible: !isModalVisible };
              });
            }}>
            Close
          </BootButton>
          <Button
            onClick={() => {
              handleDelete(setLoading);
            }}
            isLoading={loading}
            loadingText="Please Wait"
            colorScheme="blue">
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ) : (
        <></>
      )} */}
    </>
  );
}

export default Modals;
