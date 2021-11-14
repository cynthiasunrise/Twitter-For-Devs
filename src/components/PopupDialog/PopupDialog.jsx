import './PopupDialog.css';

function PopupDialog({ dialog, setDialog, handleDelete }) {
  const handleNo = () => {
    setDialog({ ...dialog, show: false });
  };

  const handleYes = () => {
    handleDelete();
  };

  return (
    <div className="dialog">
      <div className="dialog__content">
        <div className="dialog__title">
          <h2>{dialog.title}</h2>
          <span className="dialog__close" onClick={handleNo}>
            &times;
          </span>
        </div>
        <div className="dialog__buttons">
          <button className="btn btn-green" onClick={handleNo}>
            No
          </button>
          <button className="btn btn-red" onClick={handleYes}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupDialog;
