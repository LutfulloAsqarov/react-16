import React, { useEffect, useRef, useState } from "react";
import { DATA } from "../../static";
import { MdDelete } from "react-icons/md";

let statuses = ["ready", "working", "stuck", "done"];

const KanbanBoard = () => {
    const [data, setData] = useState(DATA);
    const [status, setStatus] = useState(null);

    let title = useRef();
    let desc = useRef();

    localStorage.setItem("kanbanData", JSON.stringify(data));

    const handleStatusChange = (id, newStatus) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status: newStatus,
                      }
                    : item
            )
        );
    };

    const filterByStatus = (status) => {
        return data
            .filter((el) => el.status === status)
            ?.map((el) => (
                <div key={el.id} className="kanban__item">
                    <p>{el.title}</p>
                    <p className="kanban__commit">{el.desc}</p>
                    <div className="kanban__status">
                        <select
                            value={el.status}
                            onChange={(e) =>
                                handleStatusChange(el.id, e.target.value)
                            }
                        >
                            {statuses?.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <span>09:10</span>
                    </div>
                    <button
                        onClick={() => handleDelete(el.id)}
                        className="kanban__del"
                    >
                        <MdDelete />
                    </button>
                </div>
            ));
    };

    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((el) => el.id !== id));
    };

    let readyItems = filterByStatus("ready");
    let workingItems = filterByStatus("working");
    let stuckItems = filterByStatus("stuck");
    let doneItems = filterByStatus("done");

    const handleCreateItem = (e) => {
        e.preventDefault();
        let id = new Date().getTime();
        let newItems = {
            id,
            title: title.current.value,
            desc: desc.current.value,
            status,
        };
        setData((prev) => [...prev, newItems]);
        setStatus(null);
        title.current.value = "";
        desc.current.value = "";
    };

    return (
        <section>
            <div className="container">
                <div className="kanban">
                    <h2 className="kanban__title">Kanban Board</h2>
                    <div className="kanban__header">
                        <button className="kanban__btn">Add</button>
                    </div>

                    <form
                        onSubmit={handleCreateItem}
                        className={`kanban__form ${status ? "show" : ""}`}
                    >
                        <input ref={title} type="text" placeholder="Title" />
                        <input ref={desc} type="text" placeholder="Desc" />
                        <button>Crate</button>
                    </form>

                    <div className="kanban__wrapper">
                        <div className="kanban__box ready">
                            <div className="kanban__heading">
                                <p>Ready to start / {readyItems.length}</p>
                            </div>
                            <div className="kanban__block">
                                {readyItems.length > 0 ? (
                                    readyItems
                                ) : (
                                    <p className="kanban__empty">Empty</p>
                                )}
                            </div>
                            <button
                                onClick={() => setStatus("ready")}
                                className="kanban__add_btn"
                            >
                                Add item
                            </button>
                        </div>
                        <div className="kanban__box working">
                            <div className="kanban__heading">
                                <p>Working to start / {workingItems.length}</p>
                            </div>
                            <div className="kanban__block ">
                                {workingItems.length > 0 ? (
                                    workingItems
                                ) : (
                                    <p className="kanban__empty">Empty</p>
                                )}
                            </div>
                            <button
                                onClick={() => setStatus("working")}
                                className="kanban__add_btn"
                            >
                                Add item
                            </button>
                        </div>
                        <div className="kanban__box stuck">
                            <div className="kanban__heading">
                                <p>Stuck to start / {stuckItems.length}</p>
                            </div>
                            <div className="kanban__block">
                                {stuckItems.length > 0 ? (
                                    stuckItems
                                ) : (
                                    <p className="kanban__empty">Empty</p>
                                )}
                            </div>
                            <button
                                onClick={() => setStatus("stuck")}
                                className="kanban__add_btn"
                            >
                                Add item
                            </button>
                        </div>
                        <div className="kanban__box done">
                            <div className="kanban__heading">
                                <p>Done to start / {doneItems.length}</p>
                            </div>
                            <div className="kanban__block">
                                {doneItems.length > 0 ? (
                                    doneItems
                                ) : (
                                    <p className="kanban__empty">Empty</p>
                                )}
                            </div>
                            <button
                                onClick={() => setStatus("done")}
                                className="kanban__add_btn"
                            >
                                Add item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KanbanBoard;
