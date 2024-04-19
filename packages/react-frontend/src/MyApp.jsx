// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // function removeOneCharacter(index) {
  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }

  function removeOneCharacter(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    });
  
    promise
      .then(response => {
        if (response.status === 200 || response.status === 204) {
          const updatedCharacters = characters.filter(character => character.id !== id);
          setCharacters(updatedCharacters);
        } else if (response.status === 404) {
          console.log('User not found.');
        } else {
          console.log('Error deleting user.');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then(response => {
        if (response.status === 201) {
          return response.json(); 
        } else {
          throw new Error('Failed to create user'); 
        }
      })
      .then(data => {
        setCharacters([...characters, data]); 
      })
      .catch((error) => {
        console.log(error);
      })
    }

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );

  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
}
export default MyApp;
