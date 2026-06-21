import { useAuthContext } from "@/hooks/useAuthContext";
import Administrator from "@/features/dashboard/pages/partials/administrator";
import Treasurer from "@/features/dashboard/pages/partials/treasurer";
import Student from "@/features/dashboard/pages/partials/student";
import Operator from "@/features/dashboard/components/operator";
import { Landing } from "@/features/guest/components";
import Cottage from "@/features/dashboard/pages/partials/cottage";
import Teller from "@/features/dashboard/pages/partials/teller";

const Dashboard = () => {
    const { user } = useAuthContext()
    switch (user?.role) {
        case 1:
            return <Administrator />
        case 2:
            return <Operator />
        case 3:
            return <Treasurer />
        case 4:
            return <Student />
        case 5:
            return <Cottage />
        case 6:
            return <Teller/>
        default:
            return <Landing />
    }
}
export default Dashboard;