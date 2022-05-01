export default function({ note, archived, onClickUpdate, onClickDelete, onClickChangeState }) {
    return (
        <div className="border-2 border-black rounded-md w-1/3 p-4 flex justify-between">
            <div className="flex gap-3 items-center">
                <i className="fa-solid fa-file fa-4x"></i>
                <div className="flex flex-col">
                    <p className="text-lg font-bold">{ note.title }</p>
                    <p className="text-lg font-semibold">Last edited: { note.updatedAt }</p>
                </div>
            </div>
            <div className="flex gap-3 items-end">
                <i className={ archived=='true' ? "fa-solid fa-upload fa-2x cursor-pointer":"fa-solid fa-box-archive fa-2x cursor-pointer" } title={ archived=='true' ? "Restore note":"Archive note" } onClick={() => onClickChangeState(note)}></i>
                <i className="fa-solid fa-pencil fa-2x cursor-pointer" onClick={() => onClickUpdate(note.id)} title="Update note"></i>
                <i className="fa-solid fa-trash-can fa-2x cursor-pointer" onClick={() => onClickDelete(note.id)} title="Delete note"></i>
            </div>
        </div>
    )
}