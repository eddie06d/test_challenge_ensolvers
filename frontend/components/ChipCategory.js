export default function ChipCategory({ category, handleDeleteCategory }) {
    return (
        <>
            <div className="rounded-xl font-bold h-6 px-4 flex items-center justify-between gap-2">
                <i className="fa-solid fa-tag text-white"></i>
                <span className="text-white">{category}</span>
                <i className="fas fa-times cursor-pointer text-white" onClick={e => handleDeleteCategory(category)}></i>
            </div>
            <style jsx>{`
                div {
                    background-color: black;
                }
            `}</style>
        </>
    )
}