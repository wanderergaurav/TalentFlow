import styles from "./Explorer.module.scss";
import { Link } from "react-router-dom";
const Explorer = () => {
  return (
    <div className={styles.Explorer}>
        <h2>Explore</h2>
        <div className={styles.items}>
            <Link to="/jobs" className={styles.link}>
                JOBS
            </Link>
            <Link to="/candidates" className={styles.link}>
                CANDIDATES
            </Link>
            <Link to="/assessments" className={styles.link}>
                ASSESSMENTS
            </Link>
        </div>
    </div>
  )
}

export default Explorer;