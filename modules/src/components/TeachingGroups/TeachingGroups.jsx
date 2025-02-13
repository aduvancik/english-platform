import { GroupCard } from "../../shared/layout";

export const TeachingGroups = () => {
    return <div>
        <h3 className="text-[20px]">Moї групи</h3>
        <ul className="flex flex-wrap gap-3 mt-[15px]">
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
        </ul>
    </div>;
}