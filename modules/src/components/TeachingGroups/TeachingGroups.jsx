import { GroupCard } from "../../shared/layout";

export const TeachingGroups = ({ groups, selectGroup, openModal }) => {
    return (
        <div>
            <h3 className="text-[20px]">Moї групи</h3>
            <ul className="flex flex-wrap gap-3 mt-[15px]">
                {groups.map((group) => (
                    <GroupCard key={group.id} group={group} selectGroup={selectGroup} openModal={openModal} />
                ))}
            </ul>
        </div>
    );
};
