import React, { useCallback, useEffect, useState } from "react";
import { FaClock, FaFire } from "react-icons/fa";
import { FiPlus, FiTrash } from "react-icons/fi";
import { api } from "../variable";
import { useNavigate, useParams } from "react-router-dom";

export const NotionKanban = () => {
  
  return (
    <div className="h-3/4 w-full  bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-neutral-50 ">
      <Board></Board>
    </div>
  );
};
const Board = () => {
  const [card, setCards] = useState([]);
  const { id } = useParams();
 
  useEffect(()=>{
    if (sessionStorage.getItem("role")=="developer"){
      fetch(`${api}user/task/${sessionStorage.getItem("id")}`)
      .then((res) => res.json())
      .then((data) => {
        const processedCards = data.map((item) => ({
          pid: item.pid,
          status: item.status,
          assigned_to: item.assigned_to,
          usid:item.usid,
          id: item.id.toString(), // Assuming your ID is always a string
          column: item.status.toLowerCase(), // Assuming your column name matches the status
        }));
        setCards(processedCards);
      }
        
      );
    }
    else{
      
      fetch(`${api}user/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const processedCards = data.map((item) => ({
          
          pid: item.pid,
          status: item.status,
          assigned_to: item.assigned_to,
          usid:item.usid,
          id: item.id.toString(), // Assuming your ID is always a string
          column: item.status.toLowerCase(), // Assuming your column name matches the status
        }));
        setCards(processedCards);
      }
      
        
      );
    }
  
  },[])
 
  console.log("HELLLOWWW THIS IS CARD", card);

  return (
    <div className="flex h-full w-full gap-3 overflow-y-hidden p-12">
      <Column
        title="TODO"
        column="todo"
        headingColor="text-neutral-200"
        cards={card}
        setCards={setCards}
      />
      <Column
        title="InProgress"
        column="doing"
        headingColor="text-neutral-200"
        cards={card}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-neutral-200"
        cards={card}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({ title, column, headingColor, cards, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    console.log("DRAG START")
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("HANDLE DRAG OVER ")
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };
  const clearHighlights = (els) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e) => {
   
    console.log("DRAG END")
    setActive(false);

    clearHighlights();
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";
    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter((c) => c.id !== cardId);
      const moveToBack = before === "-1";
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
      console.log("reached")
      fetch(`${api}put/taskupdate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         id:cardId,
         status:column
  
        }),
      });
    }
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-orange-300">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId="1" column={column} />
        {
          column==="todo"?  <AddCard column={column} setCards={setCards} />:<span></span>
        }
      
      </div>
    </div>
  );
};
const Card = ({
            pid,
            status,
            assigned_to,
            id,
            usid,
            column,
  handleDragStart,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowMore = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, {

            pid,
            status,
            assigned_to,
            id,
            usid,
            column,
          })
        }
        className="cursor-grap rounded border border-neutral-700 bg-[#282A36] p-3 active:cursor-grabbing"
      >
        <h1 className="text-neutral-100 font-bold text-center">{pid.title}</h1>
        <div className="mt-2">
          <label className="text-xs text-neutral-400">Description:</label>
          <p className="w-full rounded border border-neutral-700 bg-neutral-800 p-1 text-xs text-neutral-100">
            {usid.description.length > 50
              ? usid.description.slice(0, 50) + "..."
              : usid.description}
            {usid.description.length > 50 && (
              <button
                onClick={handleShowMore}
                className="ml-2 text-xs text-blue-500 focus:outline-none"
              >
                Show more
              </button>
            )}
          </p>
          {showPopup && (
            <div className="ml-16 fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-gray-500 p-8 rounded shadow-lg">
                <h2 className="text-lg font-bold text-center">{pid.title}</h2>
                <label className="text-xs text-neutral-200">
                  Detail Description:
                </label>
                <p className="mt-2 text-slate-100">{usid.description}</p>
                <button
                  onClick={handlePopupClose}
                  className="mt-4 px-4 py-2 border border-blue-500 bg-blue-500 text-white text-xs rounded focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <FaClock className="mr-1" />
          <span className="bg-neutral-800 p-1 text-xs text-neutral-100">
            {pid.deadline}
          </span>
        </div>
        <div className="mt-2 flex items-center">
          <label className="text-xs text-neutral-400">Assigned to:</label>
          <span className="bg-neutral-800 p-1 text-xs text-neutral-100">
            {assigned_to.username}
          </span>
        </div>
      </div>
    </>
  );
};
const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
};
const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((pv) => pv.filter((c) => c.id !== cardId));
    setActive(false);
  };
  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-800 bg-neutral-800/20 text-neutral-800"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const navigate= useNavigate()
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [assignedto, setAssignedTo] = useState("");
  const [adding, setAdding] = useState(false);
  const [price,setPrice]=useState()
  const addcard=async()=>{
    const bid_by=parseInt(sessionStorage.getItem("id"))
    console.log("bID",typeof(12))

  try{
   const res= await fetch(`${api}post/project`,{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify(
         {
          title:title,
          description:description,
          bid_by:bid_by,
          price:price,
          deadline:date,
          column:column
         })
       })}
       catch (error) {
        console.error(error);
      } finally {
        setAdding(false);
        setPrice("");
        setTitle("");
        setDate("");
        setDescription("");
        window.location.href="/admin/projectdetails"
      }

       
       
     
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim().length ||
      !date.trim().length ||
      !description.trim().length ||
      !assignedto.trim().length
    )
      return;

    const newCard = {
      column,
      title: title.trim(),
      deadline: date.trim(),
      description: description.trim(),
      assignedto: assignedto.trim(),
      id: Math.random().toString(),
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setAdding(false);
    setTitle("");
    setDate("");
    setDescription("");
    setAssignedTo("");
  };

  return (
    <>
      {adding ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                placeholder="Enter title"
                className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-500 placeholder-violet-300 focus:outline-0"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-2 rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-500 focus:outline-0"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-500 placeholder-violet-300 focus:outline-0"
                placeholder="Enter description"
              />
              
               <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="w-full rounded border border-violet-400 bg-violet-400/20 my-2 p-3 text-sm text-neutral-500 placeholder-violet-300 focus:outline-0"
              />
              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <button
                  onClick={() => setAdding(false)}
                  className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-500"
                >
                  Close
                </button>
                <button
                onClick={()=>{addcard()}}
                  type="submit"
                  className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                >
                  <span>Add</span>
                  <FiPlus />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};
// var DEFAULT_CARDS = [];
// fetch(`${api}get/projects`)
//   .then((res) => res.json())
//   .then((data) => (DEFAULT_CARDS = data));

const DEFAULT_CARDS = [
    {title:"dashboard",deadline:("1-April"),description:"Look into render bug in dashboard",assignedto:"Omer",id:"1",column:"todo"},
    {title:"render bug in dashboard",deadline:("2-April"),description:"Look into render bug in dashboard",assignedto:"Okasha",id:"2",column:"todo"},
    {title:"user web",deadline:("3-April"),description:"Look into render bug in dashboard Look into render bug in dashboard",assignedto:"Zainab",id:"3",column:"doing"},
    {title:"mobile app",deadline:("4-April"),description:"Look into render bug in dashboard",assignedto:"Wanya",id:"4",column:"doing"},
    {title:"ATM dashboard",deadline:("5-April"),description:"Look into render bug in dashboard",assignedto:"Rahema",id:"5",column:"done"},
    {title:"file server",deadline:("6-April"),description:"Look into render bug in dashboard",assignedto:"Sareena",id:"6",column:"done"},
    {title:"server",deadline:("7-April"),description:"Look into render bug in dashboard",assignedto:"JustFriend",id:"7",column:"done"},

]
