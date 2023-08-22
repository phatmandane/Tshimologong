import Member from "./Member";
import { useNavigate } from "react-router-dom";

const Members = ({ members, onDelete, handleToggle, handleEdit, onEdit }) => {
  const navigate = useNavigate();
  const handleEditClick = (id) => {
    const selectedMember = members.find((member) => member.id === id);
    if (selectedMember) {
      onEdit(id);
      navigate(`/edit/${id}`);
    }
  };
  return (
    <>
      {members.map((member) => (
        <Member
          key={member.id}
          member={member}
          onDelete={onDelete}
          onToggle={handleToggle}
          handleEditClick={handleEditClick} // Change 'onEdit' to 'handleEditClick'
        />
      ))}
    </>
  );
};

export default Members;
