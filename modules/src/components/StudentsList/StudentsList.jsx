import { useContext, useRef } from "react";
import { StudentRequests } from "../StudentRequests/StudentRequests";
import { TeachingGroups } from "../TeachingGroups";
import { Loader } from "../../shared/ui";
import { StudentContext } from "../../contexts/StudentContextProvider/StudentContext.js";

export const StudentsList = () => {
    const { loading, error } = useContext(StudentContext);
    const studentRequestsRef = useRef(null);

    const scrollToRequests = () => {
        studentRequestsRef.current?.scrollIntoView({ behavior: "smooth" });
      };

    return (
        <div className="flex flex-col gap-[40px]">
            <h2 className="text-[40px]">Групи та учні</h2>
            {loading && <Loader />}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <TeachingGroups scrollToRequests={scrollToRequests} />
                    <StudentRequests ref={studentRequestsRef} />
                </>
            )}
        </div>
    );
};
