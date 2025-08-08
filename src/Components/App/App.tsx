import { useState } from "react";
import css from './App.module.css'

interface NotesResponse {
    results: Note[];
    total_pages: number;
}

const App = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		        {/* Компонент SearchBox */}
		        {/* Пагінація */}
                {<button className={css.button}>Create note +</button>}
            </header>
        </div>
    )
}

export default App;