import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";
import type { FetchNotesResponse } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import { useDebounce } from "use-debounce";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const queryClient = useQueryClient();

  const { data, isFetching, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: (prev) => prev,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  }

// const createNoteMutation = useMutation({
//   mutationFn: createNote,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["notes"] });
//     setIsModalOpen(false);
//   },
// });

// const deleteNoteMutation = useMutation({
//   mutationFn: deleteNote,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["notes"] });
//   },
// });

  // const handleCreateNote = (values: { title: string; content: string; tag: string }) => {
  //   createNoteMutation.mutate(values);
  // };

  // const handleDelete = (id: string) => {
  //   deleteNoteMutation.mutate(id);
  // };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} currentPage={page} onPageChange={handlePageChange} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

        {isFetching && <Loader/>}
        {isError && <p>Error: {(error as Error).message}</p>}
        {data && data.notes.length === 0 && !isFetching && (
            <p className={css.notfound}>No notes found for "{debouncedSearch}"</p>
    )}
      {data && data.notes && data.notes.length > 0 && <NoteList notes={data.notes}  />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            // onSubmit={handleCreateNote}
            onCancel={closeModal}
            // isLoading={createNoteMutation.isPending}
            // error={createNoteMutation.isError ? (createNoteMutation.error as Error).message : null}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
