import Link from "next/link";
import { useState, useEffect } from 'react';
import NoteCard from "../../components/NoteCard";
import Swal from 'sweetalert2';
import AppLayout from "../../components/AppLayout";
import Modal from "../../components/Modal";
import { useForm } from "../../hooks/useForm";
import ChipCategory from "../../components/ChipCategory";
import axios from 'axios';
import Image from "next/image";
import emptyFig from '../../public/empty.svg';

export default function Archived() {
    const [ stateModal, setStateModal ] = useState(false);
    const [ categories, setCategories ] = useState([]);
    const [ id, setId ] = useState(0);
    const [ notes, setNotes ] = useState([]);

    const [ form, handleInputChange, uploadData, reset ] = useForm({
        title: "",
        content: "",
        category: ""
    });
    const { title, content, category } = form;

    const loadData = () => {
        axios.get('http://localhost:3001/notes')
          .then(res => {
            const notes = res.data;
            setNotes(notes.data);
          })
    };
    
    useEffect(() => {
        loadData();
    }, []);

    const addCategory = () => {
        if(categories.findIndex(el => el == category) == -1) {
          setCategories(c => [...c, category]);
        }else {
          Swal.fire({
            title: 'This category already exists',
            text: 'Please write another different',
            timerProgressBar: true,
            timer: 2500
          });
        }
    };

    const deleteCategory = (category) => {
        setCategories(categories => categories.filter(el => el != category));
    };

    const onClickUpdate = (id) => {
        setStateModal(true);
        const noteToUpdate = notes.find(el => el.id == id);
        uploadData({...noteToUpdate, category: ""});
        setId(id);
        setCategories(noteToUpdate.categories.split(" "));
    };

    const onClickDelete = (id) => {
        Swal.fire({
          title: 'Are you sure you want to delete this note?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete('http://localhost:3001/notes/'+id);
            loadData();
            Swal.fire(
              'Deleted!',
              'Your note has been deleted.',
              'success'
            )
          }
        })
    };

    const onClickRestore = async (note) => {
        await axios.put('http://localhost:3001/notes/'+note.id, {...note, isArchived: 'false'});
        loadData();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const today = new Date();
        const noteNew = {
            title,
            content,
            updatedAt: today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
            categories: categories.join(" "),
            isArchived: "true"
        };
        await axios.put('http://localhost:3001/notes/'+id,noteNew);
        loadData();
        Swal.fire(
            'Updated!',
            'Your note has been updated.',
            'success'
        ).then(() => setStateModal(false));
    };

    return (
        <AppLayout title="My archived notes" bgColor="white">
            <div className="py-6 px-4">
                <div className="flex items-center gap-12">
                    <h1 className="text-5xl font-bold">Archived notes</h1>
                    <Link href="/">
                        <a className="text-lg text-blue-500 hover:underline">
                        { "< Go back to unarchived notes" }
                    </a>
                    </Link>
                </div>
                <div className="flex gap-5 flex-wrap mt-6">
                {
                    notes.filter(note => note.isArchived == 'true').length == 0 ? (
                    <div className="w-full flex gap-5 flex-col items-center">
                        <Image src={emptyFig} alt="empty-list-notes" height={350} />
                        <p className="text-2xl font-bold">No results</p>
                        <Link href="/">
                        <a className="border rounded-md p-3 font-semibold bg-blue-500 text-white text-xl">Go back to unarchived notes</a>
                        </Link>
                    </div>
                    ) : (
                    notes.filter(note => note.isArchived == 'true').map((note, i) => (
                        <NoteCard key={i} note={note} archived="true" onClickUpdate={onClickUpdate} onClickDelete={onClickDelete} onClickChangeState={onClickRestore} />
                    ))
                    )
                }
                </div>
            </div>
            <Modal title="Edit note" estado={stateModal} setEstado={setStateModal}>
                <form onSubmit={onSubmit} className="pt-6 px-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <label className="text-xl font-semibold">Title</label>
                    <input 
                        type="text" 
                        className="border-2 p-2 outline-none rounded-md w-4/5" 
                        placeholder="Title of note"
                        name="title"
                        onChange={handleInputChange}
                        value={title}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-xl font-semibold">Content</label>
                    <textarea 
                        className="border-2 p-2 outline-none rounded-md w-4/5" 
                        rows="5" 
                        placeholder="Content of note"
                        name="content"
                        onChange={handleInputChange}
                        value={content}
                    />
                </div>
                <div className="flex items-start justify-between">
                    <label className="text-xl font-semibold">Categories</label>
                    <div className="w-4/5 border-2 rounded-md flex justify-center gap-4 flex-wrap p-3" style={{ minHeight: 50 }}>
                    {
                        categories.length > 0 && categories.map((c, i) => (
                        <ChipCategory key={i} category={c} handleDeleteCategory={deleteCategory} />
                        ))
                    }
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <input 
                    type="text" 
                    className="border-2 py-2 px-3 outline-none rounded-md" placeholder="New category" 
                    id="inputCategory"
                    name="category"
                    onChange={handleInputChange}
                    value={category}
                    />
                    <button className="border p-2 rounded-md bg-black text-white" type="button" onClick={addCategory}>Add</button>
                </div>
                <div className="flex justify-end gap-3">
                    <button type="button" className="border rounded-md bg-black text-white p-2" onClick={() => setStateModal(false)}>Cancel</button>
                    <button type="submit" className="border rounded-md bg-black text-white py-2 px-3">Save</button>
                </div>
                </form>
            </Modal>
            <style jsx>{`
                #inputCategory {
                width: calc(80% - 55px);
                }
            `}</style>
        </AppLayout>
    )
}