import { useAuthContext } from "@/hooks/useAuthContext";
import StudentTreasure from "@/features/student/pages/partials/treasure";
import StudentOperator from "@/features/student/pages/partials/operator";
import StudentCottage from "@/features/student/pages/partials/cottage";

const Student = () => {
    const { user } = useAuthContext()
    switch (user?.role) {
        case 2:
            return <StudentOperator />
        case 3:
            return <StudentTreasure />
        case 5:
            return <StudentCottage />
        default:
            return "Halaman Data Siswa"
    }
}

export default Student