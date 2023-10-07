import Modal from "../../../utilities/Modal/Modal";
import { useGeneratorContext } from "../../../context/GeneratorContext";
export default function CustomSizeModal() {
  const { setSelectedSize, setIsOpenModal, isOpenModal, setIsCustom } =
    useGeneratorContext();

  if (isOpenModal)
    return (
      <Modal closeBtn={setIsOpenModal} setIsCustom={setIsCustom}>
        <div>
          <form>
            <input
              type="number"
              placeholder="width"
              onChange={(e) =>
                setSelectedSize((curr) => {
                  return { ...curr, width: parseInt(e.target.value) };
                })
              }
            />
            <input
              type="number"
              placeholder="height"
              onChange={(e) =>
                setSelectedSize((curr) => {
                  return { ...curr, height: parseInt(e.target.value) };
                })
              }
            />
            <button
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              Save
            </button>
          </form>
        </div>
      </Modal>
    );
  return null;
}
