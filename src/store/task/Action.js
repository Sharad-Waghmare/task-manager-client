import axios from "axios";

const api = "http://localhost:8010/task/allTask";

export const allTaskData = () =>{
    return (dispatch) =>{
        dispatch({ type: "Get_Task_Pending"});
        axios
        .get(`${api}`)
        .then((res)=>{
            console.log(res.data);
            dispatch({ type: "Get_Task_Success", payload: res.data});
        })
        .catch((err) =>{
            dispatch({ type: "Get_Task_Failed", payload: err.message});
        })

    }
};

export const addTaskData = (data) =>{
    return(dispatch) =>{
        dispatch({ type: "Add_Task_Pending"});
        return axios
        .post(`${api}`, data)
        .then((res)=>{
            dispatch({ type: "Add_Task_Success", payload: res.data})
            return Promise.resolve()
        })
        .catch((err)=>{
            dispatch({ type: "Add_Task_Failed", payload: err.message})
            return Promise.reject()
        })
    }
};

export const singleTaskData = (id) =>{
    return (dispatch) => {
        dispatch({ type: "Get_SingleTask_Pending" });
      return  axios
            .get(`${api}/${id}`)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: "Get_SingleTask_Success", payload: res.data })
                return Promise.resolve()

            })
            .catch((err) => {
                dispatch({ type: "Get_SingleTask_Failed", payload: err.message })
                return Promise.reject()
            })
    };
};

export const editTaskData = (id, data) =>{
    return(dispatch) => {
        console.log(id)
        dispatch({ type: "Edit_Task_Pending" });
        return axios
          .put(`${api}/${id}`, data)

          .then((res) => {
            console.log(res.data);
            dispatch({ type: "Edit_Task_Success", payload: res.data });
            return Promise.resolve()
            
          })
          .catch((err) => {
            dispatch({ type: "Edit_Task_Failed", payload: err.message });
            return Promise.reject()
            
          });
      };
};

export const deleteTaskData = (id)=>{
    return(dispatch) =>{
        dispatch({ type: "Delete_Task_Pending"});
        return axios
        .delete(`${api}/${id}`)
        .then((res)=>{
          console.log(res);
          dispatch({ type: "Delete_Task_Success", payload: res.data });
        })
        .catch((err)=>{
          console.log(err);
          dispatch({ type: "Delete_Task_Failed", payload: err.message });
        })
      }
};