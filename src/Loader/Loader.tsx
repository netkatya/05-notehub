import { RingLoader } from "react-spinners";
import scc from './Loader.module.css';

export default function Loader() {
    return <div className={scc.backdrop}>{<RingLoader color="red"/>}</div>
}