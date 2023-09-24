import React, { useContext } from "react";
import WebContext from "../../Context/WebDetails";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Modals() {
  const {
    modal: {
      modal: { isModalVisible, title, message, handleDelete, buttonText },
      setModal,
    },
  } = useContext(WebContext);

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
          <Button
            variant="secondary"
            onClick={() => {
              setModal((prev) => {
                return { ...prev, isModalVisible: !isModalVisible };
              });
            }}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
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
