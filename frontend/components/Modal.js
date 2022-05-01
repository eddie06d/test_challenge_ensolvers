export default function Modal({ title, children, estado, setEstado }) {
    const handleClose = () => {
        setEstado(false);
    };

    return (
        <>
            {
                estado && (
                    <>
                        <div className="modal">
                            <main>
                                <header className="flex justify-between pb-3 items-center border-b-2 border-gray-500">
                                    <h3 className="text-2xl xs:text-xl font-bold">{title}</h3>
                                    <i className="fas fa-times text-2xl cursor-pointer hover:bg-gray-200 py-1 px-2 rounded-md" onClick={handleClose}></i>
                                </header>
                                {children}
                            </main>
                        </div>
                        <style jsx>{`
                            div.modal {
                                width: 100vw;
                                height: 100vh;
                                position: fixed;
                                top: 0;
                                left: 0;
                                background-color: rgba(0, 0, 0, 0.5);
                                padding: 40px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            main {
                                width: 600px;
                                min-height: 100px;
                                background-color: #fff;
                                position: relative;
                                border-radius: 5px;
                                box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
                                padding: 20px;
                            }
                        `}</style>
                    </>
                )
            }
        </>
    )
}