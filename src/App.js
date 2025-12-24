import { useState, useEffect } from "react";
import { api } from "./api";

function App() {

  // const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:9876/ping")
  //   .then((res) => res.json())
  //   .then((data) => setMsg(data.message));
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:9876/all")
  //   .then((res) => res.json())
  //   .then((data) => 
  //     data.forEach(element => { console.log(element) })
  //   )

  //   console.log("useeffect ran");

  // }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [isSignup, setIsSignup] = useState(false);


  const signup = async () => {
    const data = await api("/signup", "POST", { username: username, password: password});

    if(data.message)
    {
      alert("Signup successfull. Please login.");
      setIsSignup(false);
      setUsername("");
      setPassword("");
    }
    else
    {
      alert("Signup failed");
    }
  };

  const login = async () => {

    // const res = await fetch("http://localhost:9876/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password }),
    // });

    // const data = await res.json();

    const data = await api("/login", "POST", {username, password});

    if(data.token)
    {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    else
    {
      alert("Login Failed");
    }

  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div style={{ padding: 20}}>
      {!token ? (
        <>
        <h2>{isSignup? "Signup" : "Login"}</h2>

        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />

        <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <br/>

        {isSignup ? (
          <>
            <button onClick={signup}>Signup</button>
            <p onClick={() => setIsSignup(false)} style={{ cursor: "pointer" }}>
              Already have an account? Login
            </p>
          </>
        ) : (
          <>
            <button onClick={login}>Login</button>
            <p onClick={() => setIsSignup(true)} style={{cursor: "pointer"}}>
              New user? Signup
            </p>
          </>
        )}

        </>
      ) : (
        <>
          <button onClick={logout}> Logout </button>
          <Dashboard token={token}/>
        </>
      )}
    </div>
  );
}

function Dashboard({ token })
{
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchTasks = async () => {

  //   const res = await fetch("http://localhost:9876/tasks", {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });

  //   const data = await res.json();

    const data = await api("/tasks", "GET", null, token);

    setTasks(data);
  };

  const fetchExpenses = async () => {
    // const res = await fetch("http://localhost:9876/expenses", {
    //   headers:
    //   {
    //     Authorization: "Bearer " + token,
    //   },
    // });

    // const data = await res.json();

    const data = await api("/expenses", "GET", null, token);
    setExpenses(data);
  }

  const [totalExpense, setTotalExpense] = useState(0);

  const calculateTotal = async () => {
    // const res = await fetch("http://localhost:9876/expenses/total", {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // });

    // const data = await res.json();

    const data = await api("/expenses/total", "GET", null, token);
    setTotalExpense(data.total);
  }

  //runs once on mount(component appears for irst time) <- [].
  useEffect( () => {
    fetchTasks();
    fetchExpenses();
    // calculateTotal();
  }, []);

  useEffect( () => {
    calculateTotal();
  }, [expenses]);

  const [taskTitle, setTaskTitle] = useState("");

  const addTask = async () => {
    if(!taskTitle)
      return;

    // await fetch("http://localhost:9876/tasks", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify({ title: taskTitle }),
    // });

    await api("/tasks", "POST", {title: taskTitle}, token)

    setTaskTitle("");

    fetchTasks();
  };

  const deleteTask = async (id) => {
    // await fetch(`http://localhost:9876/tasks/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // });

    await api(`/tasks/${id}`, "DELETE", null, token);

    fetchTasks();
  }

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const updateTask = async (id) => {
    // await fetch(`http://localhost:9876/tasks/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json", 
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify({ title: editTaskTitle }),
    // });

    await api(`/tasks/${id}`, "PUT", { title: editTaskTitle}, token);

    setEditingTaskId(null);
    setEditTaskTitle("");

    fetchTasks();
  }

  const [expenseTitle, setExpenseTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = async () => {
    if(!expenseTitle || !amount)
      return;

    // fetch("http://localhost:9876/expenses", {
    //   method : "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify({
    //     title: expenseTitle,
    //     amount: Number(amount), 
    //   }),
    // });

    api("/expenses", "POST", {title: expenseTitle , amount : Number(amount)}, token);

    setExpenseTitle("");
    setAmount("");

    fetchExpenses();
  }

  const deleteExpense = async (id) => {
    // await fetch(`http://localhost:9876/expenses/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization : "Bearer " + token,  
    //   },
    // });

    await api(`/expenses/${id}`, "DELETE", null, token);

    fetchExpenses();
  };

  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editExpenseTitle, setEditExpenseTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const updateExpense = async (id) => {
    // await fetch(`http://localhost:9876/expenses/${id}`, {
    //   method: "PUT",
    //   headers: 
    //   {
    //     "Content-Type": "application/json",
    //     Authorization : "Bearer " + token
    //   },
    //   body: JSON.stringify({
    //     title: editExpenseTitle,
    //     amount: Number(editAmount)
    //   })
    // });

    await api(`/expenses/${id}`, "PUT", {title: editExpenseTitle, amount: Number(editAmount)} , token)

    setEditingExpenseId(null);
    setEditExpenseTitle("");
    setEditAmount("");

    fetchExpenses();
  }


  return(
    <>
      <h2>Dashboard</h2>

      <h3>Add Task</h3>
      <input 
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      placeholder="Task Title"
      />
      <button onClick={addTask}>Add Task</button>

      <br/>
      {/* <button onClick={fetchTasks}>Load Tasks</button> */}
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
          {editingTaskId === t._id ? (
            <>
              <input
                value={editTaskTitle}
                onChange={(e) => setEditTaskTitle(e.target.value)}
              />
              <button onClick={() => updateTask(t._id)}>Save</button>
            </>
          ): (
          <>
            {t.title} 
            <button onClick={ () => {
              setEditingTaskId(t._id);
              setEditTaskTitle(t.title);
            }}>✏️</button>
            <button onClick={ () => deleteTask(t._id) }>❌</button>
          </> 
          )}
          </li>
        ))}
      </ul>

      <h3>Add Expense</h3>
      <input
        placeholder="Expense Title"
        value={expenseTitle}
        onChange={(e) => setExpenseTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addExpense}>Add Expense</button>

      {/* <button onClick = {fetchExpenses}>Load Expenses</button> */}
      <ul>
        {expenses.map((e) => (
          <li key={e._id}>
          {editingExpenseId === e._id ? (
            <>
              <input
                value={editExpenseTitle}
                onChange={(e) => setEditExpenseTitle(e.target.value)}
              />
              <input
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
              <button onClick={() => updateExpense(e._id)}>Save</button>
            </>
          ): (
          <>
            {e.title} - {e.amount}
            <button onClick={() => {
              setEditingExpenseId(e._id);
              setEditExpenseTitle(e.title);
              setEditAmount(e.amount);
            }}>✏️</button>
            <button onClick={() => deleteExpense(e._id)}>❌</button>
          </>
          )}
          </li>
        ))}
      </ul>

      {/* <br/> */}

      {/* <button onClick={calculateTotal}> Calculate Updated Total Expense </button> */}
      <h4>Total Expense: {totalExpense} </h4>

    </>
  );
}

export default App;
