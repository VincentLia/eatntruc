import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [formFriend, setFormFriend] = useState(false);
  const [friend, setfriend] = useState(initialFriends);

  function handleAddFriend(newFriend) {
    setfriend((friend) => [...friend, newFriend]);
    console.log(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ListCards newListfriend={friend} />
        {formFriend || (
          <Button onClick={() => setFormFriend((f) => true)}>Add Friend</Button>
        )}
        {formFriend && (
          <div>
            <FormFriend onAddFriend={handleAddFriend} onOpen={setFormFriend} />
          </div>
        )}
      </div>
    </div>
  );
}

function ListCards({ newListfriend }) {
  return (
    <ul>
      {newListfriend.map((friend) => (
        <Card friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Card({ friend }) {
  return (
    <li>
      <img src={friend.image} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">{`${friend.name} owes you ${Math.abs(
          friend.balance
        )}€`}</p>
      ) : friend.balance > 0 ? (
        <p className="green">{`You owe ${friend.name} ${friend.balance}€`}</p>
      ) : (
        <p>{`You and ${friend.name} are even`}</p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function FormFriend({ onOpen, onAddFriend }) {
  const [name, setName] = useState("");

  function submitFriend(e) {
    e.preventDefault();
    if (name === "") return;
    console.log("ok");
    const id = Date.now();
    console.log(id);
    const newFriend = {
      id: id,
      name: name,
      image: `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);
  }

  return (
    <div>
      <form className="form-add-friend">
        <div>
          <label>Friend name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
          />
          <label>Image URL</label>
          <input type="text" placeholder="lol" />
        </div>
        <Button onClick={submitFriend}>Add</Button>
      </form>
      <Button onClick={() => onOpen((f) => !f)}>Close</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
