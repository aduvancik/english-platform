import { useState, useContext } from "react";

import { GroupCard } from "../../shared/layout";
import { GroupInfoModal } from "./GroupInfoModal";
import { BasicButton } from "../../shared/ui/BasicButton.jsx";
import { Loader } from "../../shared/ui/Loader.jsx";
import { GroupContext } from "../../contexts/GroupContextProvider/GroupContext.js";

export const TeachingGroups = ({ scrollToRequests }) => {
    const { groups, sortedGroups, usersGroups, error, loading, generateGroups } = useContext(GroupContext);
    const [allGroupsDisplayed, setAllGroupsDisplayed] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    return (
        <div>
            {loading && <Loader />}
            {error && <p>{error.message || "An unexpected error occurred"}</p>}
            {!loading && !error && (
                <>
                    <div>
                        <div className="flex gap-5">
                            <BasicButton
                                isActive={allGroupsDisplayed}
                                handleClick={() => {
                                    setAllGroupsDisplayed(true);
                                }}
                            >
                                All groups ({groups ? groups.length : 0})
                            </BasicButton>
                            <BasicButton
                                isActive={!allGroupsDisplayed}
                                handleClick={() => {
                                    setAllGroupsDisplayed(false);
                                }}
                            >
                                My groups ({usersGroups ? usersGroups.length : 0})
                            </BasicButton>
                        </div>
                        <ul className="flex flex-wrap gap-3 mt-[15px]">
                            {!loading &&
                                groups &&
                                sortedGroups &&
                                (groups.length === 0 ? (
                                    <div className="flex w-full gap-10 items-center justify-center flex-wrap">
                                        <p>Групи не створено. Бажаєте зробити це зараз?</p>
                                        <BasicButton handleClick={generateGroups}>
                                            Згенерувати групи
                                        </BasicButton>
                                    </div>
                                ) : allGroupsDisplayed ? (
                                    <div className="flex flex-col w-full gap-10">
                                        {sortedGroups.map((studyGroup) => (
                                            <div key={studyGroup.teacher.id}>
                                                <h4 className="font-bold text-2xl p-3">
                                                    {studyGroup.teacher.firstName}{" "}
                                                    {studyGroup.teacher.lastName}
                                                </h4>
                                                <div className="flex gap-5 flex-wrap">
                                                    {studyGroup.groups.map((group) => (
                                                        <GroupCard
                                                            key={group.id}
                                                            group={group}
                                                            selectGroup={() =>
                                                                setSelectedGroup(group)
                                                            }
                                                            openModal={handleOpenModal}
                                                            studentsAmount={
                                                                group.students
                                                                    ? group.students.length
                                                                    : 0
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    usersGroups.map((group) => (
                                        <GroupCard
                                            key={group.id}
                                            group={group}
                                            selectGroup={() => setSelectedGroup(group)}
                                            openModal={handleOpenModal}
                                            studentsAmount={
                                                group.students ? group.students.length : 0
                                            }
                                        />
                                    ))
                                ))}
                        </ul>
                    </div>
                </>
            )}
            <div>
                <GroupInfoModal
                    loading={loading}
                    error={error}
                    scrollToRequests={scrollToRequests}
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    group={selectedGroup}
                />
            </div>
        </div>
    );
};
