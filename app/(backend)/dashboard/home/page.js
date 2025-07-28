import DashboardView from "sections/dashboard/DashboardView";

export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard',
};

export default function Home() {
    return (
        <>
            <DashboardView />
        </>
    );
}
